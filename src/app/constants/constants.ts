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
