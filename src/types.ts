export type PredictionCategory =
  | "AI"
  | "Tech"
  | "Markets"
  | "Crypto"
  | "Sports"
  | "Music"
  | "Entertainment"
  | "Startups"
  | "World Events";

export type PredictionStatus = "active" | "resolved" | "failed";
export type PredictionOutcome = "Yes" | "No";
export type Difficulty = "Easy" | "Medium" | "Hard" | "Very Hard";
export type PlanId = "explorer" | "predictor" | "master" | "oracle";
export type BadgeRarity = "common" | "rare" | "epic" | "legendary";

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  futureScore: number;
  accuracy: number;
  credits: number;
  totalEarned: number;
  totalSpent: number;
  level: number;
  xp: number;
  rank: number | null;
  bestStreak: number;
  currentStreak: number;
  createdAt: string;
  plan: PlanId;
  activePredictionLimit: number;
  activePredictionCount: number;
  monthlyBonusCredits: number;
  planStartedAt?: string;
  planRenewsAt?: string;
  isCreatorSeller: boolean;
}

export interface Prediction {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rawText: string;
  cleanedText: string;
  resolutionCriteria?: string;
  category: PredictionCategory;
  confidence: number;
  deadline: string;
  status: PredictionStatus;
  predictedOutcome: PredictionOutcome;
  resolvedOutcome?: PredictionOutcome;
  difficulty: Difficulty;
  rewardCredits: number;
  createdAt: string;
  resolvedAt?: string;
  participantCount: number;
  isCorrect?: boolean;
}

export interface CreditTransaction {
  id: string;
  userId: string;
  type:
    | "earned_prediction"
    | "spent_coupon"
    | "bonus_signup"
    | "bonus_daily"
    | "bonus_referral"
    | "admin_adjustment"
    | "event_reward"
    | "earned"
    | "spent"
    | "bonus";
  amount: number;
  reason: string;
  predictionId?: string;
  createdAt: string;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  creator: string;
  vendor?: string;
  description: string;
  category: string;
  priceCredits: number;
  image?: string;
  type: MarketplaceItemType;
  active: boolean;
  discountText?: string;
  featured?: boolean;
}

export type MarketplaceItemType =
  | "coupon"
  | "sponsor_offer"
  | "creator_product"
  | "digital_download"
  | "gift_card_placeholder"
  | "premium_access"
  | "badge"
  | "report"
  | "plugin"
  | "template";

export interface CouponOffer {
  id: string;
  title: string;
  vendor: string;
  creator?: string;
  description: string;
  category: string;
  type: MarketplaceItemType;
  discountText?: string;
  requiredCredits: number;
  couponCode: string;
  affiliateUrl: string;
  imageUrl?: string;
  expiryDate?: string;
  terms: string;
  source:
    | "manual"
    | "rakuten"
    | "couponapi"
    | "linkmydeals"
    | "fmtc"
    | "sponsor"
    | "creator";
  featured: boolean;
  active: boolean;
  createdAt: string;
}

export interface UnlockedCoupon {
  id: string;
  userId: string;
  couponOfferId: string;
  couponCode: string;
  creditsSpent: number;
  unlockedAt: string;
  affiliateUrl: string;
  expiryDate?: string;
  title: string;
  vendor: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: BadgeRarity;
  unlockedAt?: string;
  category: string;
}

export interface PredictionEvent {
  id: string;
  title: string;
  category: PredictionCategory;
  description: string;
  startDate: string;
  endDate: string;
  entryCostCredits: number;
  rewardPoolCredits: number;
  sponsorName?: string;
  participantCount: number;
  status: "upcoming" | "live" | "completed";
  featured: boolean;
}

export interface CategoryStat {
  id: string;
  name: PredictionCategory;
  icon: string;
  predictionCount: number;
  accuracy: number;
  sparkline: number[];
}

export interface RewardBreakdown {
  creditsEarned: number;
  xpGained: number;
  futureScoreBefore: number;
  futureScoreAfter: number;
  rankBefore: number;
  rankAfter: number;
  badgeUnlocked?: Badge;
  streak: number;
  accuracyBefore: number;
  accuracyAfter: number;
  proofCardUnlocked: boolean;
}

export interface PlanDefinition {
  id: PlanId;
  name: string;
  priceLabel: string;
  activePredictionLimit: number;
  monthlyBonusCredits: number;
  features: string[];
  badge: string;
}

export interface ValidationResult {
  isMeasurable: boolean;
  cleanedText: string;
  resolutionCriteria: string;
  category: PredictionCategory;
  difficulty: Difficulty;
  potentialRewardCredits: number;
  feedback?: string;
}
