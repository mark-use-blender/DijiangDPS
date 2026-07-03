import type { timeline, modifier, trigPackage, trigPackageArr } from "./dpsengine";
import { Optype, Proc } from "./dpsengine";
export function moddef(modifier:string){
    const modarr : Record<string,modifier> = {};
    return modarr[modifier]
}