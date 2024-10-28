// src/lib/utils.ts
export const generateGamePin = () => {
  return Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase();
}

export const calculateTotalScore = (scores: Array<{ value: number }>) => {
  return scores.reduce((total, score) => total + score.value, 0);
}

export const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export const validateHoleScore = (score: number): boolean => {
  return score >= 1 && score <= 15; // Assuming max score per hole is 15
}