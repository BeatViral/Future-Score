import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { demoUser } from "../data/mockData";
import type { PlanId, UserProfile } from "../types";

export function createDefaultUser(params: {
  uid: string;
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
}): UserProfile {
  return {
    uid: params.uid,
    displayName: params.displayName || "Future Predictor",
    email: params.email || "",
    photoURL: params.photoURL || "",
    futureScore: 0,
    accuracy: 0,
    credits: 10,
    totalEarned: 10,
    totalSpent: 0,
    level: 1,
    xp: 0,
    rank: null,
    bestStreak: 0,
    currentStreak: 0,
    createdAt: new Date().toISOString(),
    plan: "explorer",
    activePredictionLimit: 5,
    activePredictionCount: 0,
    monthlyBonusCredits: 0,
    planStartedAt: new Date().toISOString(),
    isCreatorSeller: false,
  };
}

export async function getUserProfile(uid: string) {
  if (!db) return uid === demoUser.uid ? demoUser : null;
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? (snap.data() as UserProfile) : null;
}

export async function ensureUserProfile(params: {
  uid: string;
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
}) {
  const fallback = createDefaultUser(params);
  if (!db) return fallback;

  const ref = doc(db, "users", params.uid);
  const snap = await getDoc(ref);
  if (snap.exists()) return snap.data() as UserProfile;

  await setDoc(ref, fallback);
  return fallback;
}

export async function updateUserPlan(uid: string, plan: PlanId, limit: number, monthlyBonusCredits: number) {
  if (!db) return;
  await updateDoc(doc(db, "users", uid), {
    plan,
    activePredictionLimit: limit,
    monthlyBonusCredits,
    planStartedAt: new Date().toISOString(),
  });
}
