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
  logo?: string;
}

export interface UserCard {
  quantity: number;
  card: {
    id: number;
    rarity: string;
    image: string;
    name: string;
    cardSet: {
      name: string;
    };
  };
}
