import type { timeline, wepon, trigPackage , trigPackageArr} from "./dpsengine";
import { Optype, Proc } from "./dpsengine";



export function wepondef(wepon:string){
    const wparr : Record<string,wepon> = {};
    return wparr[wepon]
}