export enum STORAGE {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
}

// const currentEnv = process.env['something'];
const currentEnv = 'development';

export const getHost = () => {
  let host = '';

  switch (currentEnv) {
    // case 'production':
    //   host = 'https://';
    //   break;
    case 'development':
      host = 'http://localhost:3000';
      break;
    default:
      host = 'https://';
      break;
  }

  return host;
};

export const getBackEndHost = (): string => {
  const host = 'http://localhost:3001';
  return host;
};

export const CARDS_SORT_CATEGORY = {
  CARD_COLLECTION_NUMBER: 'Card collection number',
  RECENCY: 'Recency',
  RARITY: 'Rarity',
  DUPLICATES: 'Duplicates',
  TYPES: 'Types',
};

export const SortField = {
  id: CARDS_SORT_CATEGORY.CARD_COLLECTION_NUMBER,
  types: CARDS_SORT_CATEGORY.TYPES,
  rarity: CARDS_SORT_CATEGORY.RARITY,
  updatedAt: CARDS_SORT_CATEGORY.RECENCY,
  quantity: CARDS_SORT_CATEGORY.DUPLICATES,
};

enum Rarity {
  ONE_DIAMOND = 'One Diamond',
  TWO_DIAMOND = 'Two Diamond',
  THREE_DIAMOND = 'Three Diamond',
  FOUR_DIAMOND = 'Four Diamond',
  ONE_STAR = 'One Star',
  TWO_STAR = 'Two Star',
  THREE_STAR = 'Three Star',
  CROWN = 'Crown',
  NONE = 'None',
}

export const diamondRarities: string[] = [
  Rarity.ONE_DIAMOND,
  Rarity.TWO_DIAMOND,
  Rarity.THREE_DIAMOND,
  Rarity.FOUR_DIAMOND,
];

export const starRarities: string[] = [
  Rarity.ONE_STAR,
  Rarity.TWO_STAR,
  Rarity.THREE_STAR,
];
