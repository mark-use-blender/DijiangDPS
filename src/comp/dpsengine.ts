import * as operdef from "./operatordef";
import * as wepondef from "./wepondef";
import * as moddef from "./modifierdef";

export enum Optype {
    Bs = 1,
    Cs = 2,
    Ul = 3
};
export enum Proc {
    Ini = 1,
    Popu = 2,
    Post = 3
};
export enum Sourse {
    OPE = 1,
    WPN = 2,
    MOD = 3

}
export type timeline = Record<string,(unknown)[]>;
export type operator = (process:Proc,tl:timeline,op?:Optype,step?:number,position?:number) => trigPackageArr;
export type wepon = (process:Proc,tl:timeline,tp:trigPackageArr,step?:number,position?:number) => trigPackageArr;
export type modifier = (process:Proc,tl:timeline,tp:trigPackageArr,step?:number) => trigPackageArr;
export type trigPackage = [Sourse,string];
export type trigPackageArr = trigPackage[];

type actPackage = [operator,Optype];
var timelineArr: timeline = {} ;
var actArr:actPackage[];
var operatorArr: operator [] =[];
var weponArr: wepon[] = [];
var modArr: modifier[] = [];
var trigpackageAArr: trigPackageArr[] = [];




export function MainScheduler(operators:string[],wepons:string[],modifiers:string[],actions:string) {
    for (var ooperator in operators){
        let tmp:operator = operdef.opdef(ooperator);
        operatorArr.push(tmp)
        tmp(Proc.Ini,timelineArr,undefined,undefined,operators.indexOf(ooperator))
    }
    for (var wwepon in wepons){
        let tmp:wepon = wepondef.wepondef(wwepon);
        weponArr.push(tmp)
        tmp(Proc.Ini,timelineArr,[])
    }
    for (var mmodifier in modifiers){
        let tmp:modifier = moddef.moddef(mmodifier);
        modArr.push(tmp)
        tmp(Proc.Ini,timelineArr,[])
    }
    actArr = actionparser(actions)
    let stp:number = actArr.length;
    for (let tmp:number = 0;tmp<stp;tmp++){
        let act = actArr[tmp]
        if (act){
            let opind:number = operatorArr.indexOf(act[0]);
            trigpackageAArr[tmp] = act[0](Proc.Popu,timelineArr,act[1],tmp,opind)
            let wstp:number = weponArr.length;
            for (let wtmp:number = 0;wtmp<wstp;wtmp++){
                trigpackageAArr[tmp] = trigpackageAArr[tmp].concat( weponArr[wtmp](Proc.Popu,timelineArr,trigpackageAArr[tmp],tmp,wtmp))
            }
        }
    }
    stp = operatorArr.length
    for (let tmp:number = 0;tmp<stp;tmp++){        
        operatorArr[tmp](Proc.Post,timelineArr)
    }
    stp = weponArr.length
    for (let tmp:number = 0;tmp<stp;tmp++){        
        weponArr[tmp](Proc.Post,timelineArr,[])
    }
    
}




function actionparser(actions:string){
    let actArr:string[];
    actArr = actions.split(",");
    let result:actPackage[] = [];
    for (let act in actArr){
        let inter:any[] = act.split(":")
        if (inter.length ==3){
            let op:operator;
            op = operatorArr[inter[0]]
            result[inter[1] as number] = [op,inter[2] as number as Optype]
        }
    }
    return result
}