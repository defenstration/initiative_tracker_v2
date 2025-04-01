export interface Character {
  id: string;
  name: string;
  level: number;
  initiative: number;
  initiativeModifier: number;
  hp: number;
  maxHp: number;
  isActive: boolean;
  type: 'player' | 'enemy';
}

export interface GraveyardEntry {
  id: string;
  name: string;
  level: number;
  count: number;
  type: 'enemy';
} 