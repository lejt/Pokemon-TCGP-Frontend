import { diamondRarities, starRarities } from '../constants/constants';
import { UserCard } from '../interfaces/entity.interface';

interface RarityCount {
  diamondCount: number;
  starCount: number;
}

type UserCardsRarityCount = Record<string, RarityCount>;

export const calculateUserCardRarity = (
  userCards: UserCard[]
): UserCardsRarityCount => {
  const rarityCounts: UserCardsRarityCount = {};

  userCards.forEach((uc) => {
    const cardSetName = uc.card.cardSet.name;

    if (!rarityCounts[cardSetName]) {
      rarityCounts[cardSetName] = { diamondCount: 0, starCount: 0 };
    }

    if (diamondRarities.includes(uc.card.rarity)) {
      rarityCounts[cardSetName].diamondCount++;
    } else if (starRarities.includes(uc.card.rarity)) {
      rarityCounts[cardSetName].starCount++;
    }
  });

  return rarityCounts;
};
