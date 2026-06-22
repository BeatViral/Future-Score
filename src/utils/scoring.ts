import { badges } from "../data/mockData";
import type { Difficulty, Prediction, RewardBreakdown, UserProfile } from "../types";

const difficultyCredits: Record<Difficulty, number> = {
  Easy: 5,
  Medium: 15,
  Hard: 50,
  "Very Hard": 100,
};

const difficultyXp: Record<Difficulty, number> = {
  Easy: 25,
  Medium: 75,
  Hard: 150,
  "Very Hard": 300,
};

export function calculateFutureScore(params: {
  resolvedCorrect: number;
  totalCreditsEarned: number;
  bestStreak: number;
  difficultyBonus: number;
}) {
  return Math.round(
    params.resolvedCorrect * 10 +
      params.totalCreditsEarned * 0.5 +
      params.bestStreak * 5 +
      params.difficultyBonus,
  );
}

export function calculateCreditReward(prediction: Pick<Prediction, "difficulty" | "confidence" | "deadline" | "createdAt">) {
  const base = difficultyCredits[prediction.difficulty];
  const confidenceBonus =
    prediction.confidence >= 86 ? 0.2 : prediction.confidence >= 71 ? 0.1 : 0;
  const lockWindowDays = Math.max(
    0,
    (new Date(prediction.deadline).getTime() - new Date(prediction.createdAt).getTime()) /
      86400000,
  );
  const earlyBonus = lockWindowDays >= 180 ? 0.2 : lockWindowDays >= 60 ? 0.1 : 0;
  return Math.round(base * (1 + confidenceBonus + earlyBonus));
}

export function calculatePredictionRewards(
  prediction: Prediction,
  user: UserProfile,
): RewardBreakdown {
  const baseCredits = calculateCreditReward(prediction);
  const xp = difficultyXp[prediction.difficulty];
  const streakBonus = user.currentStreak >= 3 ? Math.min(user.currentStreak * 2, 40) : 0;
  const categoryBonus = prediction.category === "AI" || prediction.category === "Markets" ? 5 : 0;
  const tierMultiplier =
    user.plan === "oracle" ? 1.25 : user.plan === "master" ? 1.15 : user.plan === "predictor" ? 1.05 : 1;
  const creditsEarned = Math.round((baseCredits + streakBonus + categoryBonus) * tierMultiplier);
  const futureScoreAfter = user.futureScore + Math.round(creditsEarned * 0.8 + xp * 0.2);
  const rankBefore = user.rank || 4921;
  const rankAfter = Math.max(1, rankBefore - Math.round(creditsEarned * 6.2));
  const accuracyAfter = Math.min(99, user.accuracy + (user.accuracy < 90 ? 1 : 0));
  const badgeUnlocked =
    prediction.difficulty === "Very Hard"
      ? badges.find((badge) => badge.id === "early-signal")
      : user.currentStreak >= 2
        ? badges.find((badge) => badge.id === "three-win")
        : undefined;

  return {
    creditsEarned,
    xpGained: xp,
    futureScoreBefore: user.futureScore,
    futureScoreAfter,
    rankBefore,
    rankAfter,
    badgeUnlocked,
    streak: user.currentStreak + 1,
    accuracyBefore: user.accuracy,
    accuracyAfter,
    proofCardUnlocked: true,
  };
}

export function levelName(level: number) {
  if (level >= 80) return "Nostradamus";
  if (level >= 60) return "Oracle";
  if (level >= 28) return "Master Predictor";
  if (level >= 18) return "Trend Seeker";
  if (level >= 10) return "Sharp Signal";
  if (level >= 4) return "Rising Predictor";
  return "Rookie Predictor";
}
