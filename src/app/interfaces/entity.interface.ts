export interface Card {
  id: number;
  name: string;
  rarity: string;
  cardSet?: CardSet;
  image?: string;
}

export interface CardSet {
  id: number;
  name: string;
  externalId?: string;
  image?: string;
  logo?: string;
}

export interface UserCard {
  quantity: number;
  // id: string;
  // updatedAt: string;
  // createdAt: string;
  card: {
    id: number;
    rarity?: string;
    image: string;
    name: string;
    effect?: string;
    hp?: number;
    description?: string;
    trainerType?: string;
    attacks?: Attack[];
    stage?: string;
    weakness?: WeaknessData[];
    retreat?: number;
    illustrator?: string;
    category?: string;
    abilities?: Ability[];
    cardSet: UserCardCardSet;
    types: string[];
    // externalId: string;
    // evolveFrom?: string;
    // createdAt: string;
  };
}

export interface Attack {
  cost: string[];
  name: string;
  damage: string;
}

interface WeaknessData {
  type: string;
  value: string;
}

interface UserCardCardSet {
  id: number;
  name: string;
}

export interface Ability {
  type: string;
  name: string;
  effect: string;
}

export interface Pack {
  id: number;
  image?: string;
}

export interface CardSetFromCardSetAndPacks {
  id: number;
  name: string;
  image?: string;
  packs: Pack[];
  logo?: string;
}
