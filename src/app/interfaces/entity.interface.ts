export interface Card {
  id: string;
  name: string;
  rarity: string;
  cardSet: CardSet;
  image?: string;
}

export interface CardSet {
  id: string;
  name: string;
  externalId?: string;
  logo?: string;
}

export interface UserCard {
  card: {
    id: string;
    rarity: string;
    image: string;
    name: string;
    cardSet: {
      name: string;
    };
  };
}
