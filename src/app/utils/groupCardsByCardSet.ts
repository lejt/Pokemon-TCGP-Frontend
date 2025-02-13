import { Card, CardSet } from '../interfaces/entity.interface';

interface GroupedCards {
  [key: string]: {
    cardSet: CardSet;
    cards: Card[];
  };
}

export const groupCardsByCardSet = (cards: Card[]): GroupedCards => {
  return cards?.reduce((acc, card) => {
    const cardSetId = card.cardSet.id;

    if (!acc[cardSetId]) {
      acc[cardSetId] = {
        cardSet: {
          id: card.cardSet.id,
          name: card.cardSet.name,
          externalId: card.cardSet.externalId,
          logo: card.cardSet.logo,
        },
        cards: [],
      };
    }

    acc[cardSetId].cards.push(card);
    return acc;
  }, {} as GroupedCards);
};
