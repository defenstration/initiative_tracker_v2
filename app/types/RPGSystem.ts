export type RPGSystem = 'pathfinder' | 'dnd5e' | 'starfinder';

export interface SystemRules {
  name: string;
  initiativeModifier: string; // e.g., "DEX + misc"
  levelScaling: {
    hpPerLevel: number;
    initiativeBonus?: number;
  };
  statusEffects: string[];
  conditions: string[];
}

export const SYSTEM_RULES: Record<RPGSystem, SystemRules> = {
  pathfinder: {
    name: "Pathfinder 2e",
    initiativeModifier: "DEX + Perception",
    levelScaling: {
      hpPerLevel: 6,
      initiativeBonus: 0
    },
    statusEffects: [
      "Dying",
      "Wounded",
      "Unconscious",
      "Stunned",
      "Paralyzed",
      "Frightened",
      "Sickened",
      "Clumsy",
      "Enfeebled",
      "Stupefied"
    ],
    conditions: [
      "Blinded",
      "Concealed",
      "Dazzled",
      "Deafened",
      "Flat-footed",
      "Fleeing",
      "Grabbed",
      "Hidden",
      "Immobilized",
      "Invisible",
      "Observed",
      "Prone",
      "Quickened",
      "Restrained",
      "Shaken",
      "Slowed",
      "Squeezing",
      "Stunned",
      "Unconscious"
    ]
  },
  dnd5e: {
    name: "D&D 5e",
    initiativeModifier: "DEX",
    levelScaling: {
      hpPerLevel: 4,
      initiativeBonus: 0
    },
    statusEffects: [
      "Unconscious",
      "Stunned",
      "Paralyzed",
      "Frightened",
      "Poisoned",
      "Exhaustion"
    ],
    conditions: [
      "Blinded",
      "Charmed",
      "Deafened",
      "Frightened",
      "Grappled",
      "Incapacitated",
      "Invisible",
      "Paralyzed",
      "Petrified",
      "Poisoned",
      "Prone",
      "Restrained",
      "Stunned",
      "Unconscious"
    ]
  },
  starfinder: {
    name: "Starfinder",
    initiativeModifier: "DEX + misc",
    levelScaling: {
      hpPerLevel: 5,
      initiativeBonus: 0
    },
    statusEffects: [
      "Dying",
      "Staggered",
      "Unconscious",
      "Stunned",
      "Paralyzed",
      "Frightened",
      "Sickened",
      "Entangled"
    ],
    conditions: [
      "Blinded",
      "Confused",
      "Dazzled",
      "Deafened",
      "Entangled",
      "Fascinated",
      "Flat-footed",
      "Grappled",
      "Hidden",
      "Invisible",
      "Nauseated",
      "Off-kilter",
      "Off-target",
      "Pinned",
      "Prone",
      "Shaken",
      "Sickened",
      "Staggered",
      "Stunned",
      "Unconscious"
    ]
  }
}; 