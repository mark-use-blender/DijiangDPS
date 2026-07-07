export type StatusLevel =  0|1|2|3|4;
export type BuffLevel = number;
export type TriggerType = 
"BasicAttack"|
"BasicAttack:FinalStrike"|
"Skill:BattleSkills"|
"Skill:ComboSkills"|
"Skill:Ultimates"|
"StaggerNode"|
"Finisher"|
"ApplyVulnerable"|
"ApplyHeat"|
"ApplyElectric"|
"ApplyCryo"|
"ApplyNature"|
"ApplyHeatBurst"|
"ApplyElectricBurst"|
"ApplyCryoBurst"|
"ApplyNatureBurst"|
"ApplyLifted"|
"ApplyKnockedDown"|
"ApplyCrushed"|
"ApplyBreached"|
"ApplyWeakened"|
"ApplyPhysicalSusceptibility"|
"ApplyHeatSusceptibility"|
"ApplyElectricSusceptibility"|
"ApplyCryoSusceptibility"|
"ApplyNatureSusceptibility"|
"ApplyElectrification"|
"ApplySolidification"|
"ApplyCorrosion"|
"ApplyCombustion"|
"ApplyOriginiumCrystals"|
"ApplyCritical"|
"ApplyShield"|
"Heal"|
"ConsumeVulnerable"|
"ConsumeHeat"|
"ConsumeElectric"|
"ConsumeCryo"|
"ConsumeNature"|
"ConsumeElectrification"|
"ConsumeSolidification"|
"ConsumeCorrosion"|
"ConsumeCombustion"|
"GainElectricAmp"|
"GainLink"|
"RecoverSP";

export type StatusType =
"Vulnerable"|
"Heat"|
"Electric"|
"Cryo"|
"Nature"|
"OperatorHeat"|
"OperatorElectric"|
"OperatorCryo"|
"OperatorNature"|
"OperatorLink";

export type BuffType =
"PhysicalSusceptibility"|
"HeatSusceptibility"|
"ElectricSusceptibility"|
"CryoSusceptibility"|
"NatureSusceptibility";
export type CalculationTick = (tl:Timeline,of:number) => void;
export type ActionTick = (tl:Timeline,of:number) => void;
export type DamageTick = (tl:Timeline,of:number) => void;
export type TriggerPacket = [TriggerType,number];
export type StateMachine = number;
export type Potential = 0|1|2|3|4|5;
export type Rank = 0|1|2|3|4|5|6|7|8|9|10|11|12;
export type Stat = 0|1|2|3|4|5|6|7|8|9;

export interface Timeline{
    StatusArr: Record<keyof StatusType, StatusLevel[]>;
    BuffArr: Record<keyof BuffType, BuffLevel[]>;
    StateMachineArr: { [key: string]: StateMachine[] };
    CalculationTickArr: { [key: string]: CalculationTick[] };
    ActionTickArr: { [key: string]: ActionTick[] };
    DamageTickArr: { [key: string]: DamageTick[] };
    TriggerPacketArr: { [key: string]: TriggerPacket[] };
}


export interface WeponInt {
    PotentialPhase: Potential;
    Level: number;
    Stat1: Stat;
    Stat2: Stat;
    StatSkill: Stat;


}


export abstract class WeponCL {
    WeponStats:WeponInt;

    constructor(stat:WeponInt){
        this.WeponStats = stat
    }

}


export interface OperatorInt {
    IsControll: boolean;
    Wepon: WeponCL;

    PotentialPhase: Potential;
    Level: number;
    Elite: 0|1|2|3|4;
    Talent1: 0|1|2|3;
    Talent2: 0|1|2|3;
    AttributeIncrease: 0|1|2|3|4;
    BasicAttackRank: Rank;
    BattleSkillRank: Rank;
    ComboSkillRank:  Rank;
    UltimateRank:    Rank;
    Attribute:{"Stringth":number,"Agility":number,"Inteliect":number,"Will":number};
    Stats:{"HP":number,"Attack":number,"Defence":number};
}

export interface OperatorCL {
    OperaterStats:OperatorInt;
    initArray(tl:Timeline):void;
}

