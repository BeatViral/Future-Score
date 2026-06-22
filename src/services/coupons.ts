import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { couponOffers } from "../data/mockData";
import { db } from "../lib/firebase";
import type { CouponOffer, UnlockedCoupon } from "../types";

export async function fetchCouponOffers() {
  if (!db) return couponOffers;
  const snap = await getDocs(
    query(collection(db, "couponOffers"), where("active", "==", true)),
  );
  return snap.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })) as CouponOffer[];
}

export async function unlockCoupon(userId: string, offer: CouponOffer): Promise<UnlockedCoupon> {
  const unlocked: Omit<UnlockedCoupon, "id"> = {
    userId,
    couponOfferId: offer.id,
    couponCode: offer.couponCode,
    creditsSpent: offer.requiredCredits,
    unlockedAt: new Date().toISOString(),
    affiliateUrl: offer.affiliateUrl,
    expiryDate: offer.expiryDate,
    title: offer.title,
    vendor: offer.vendor,
  };

  if (!db) {
    return { id: `local-unlocked-${Date.now()}`, ...unlocked };
  }

  const ref = await addDoc(collection(db, "unlockedCoupons"), unlocked);
  return { id: ref.id, ...unlocked };
}

export async function getUnlockedCoupons(userId: string) {
  if (!db) return [] as UnlockedCoupon[];
  const snap = await getDocs(
    query(collection(db, "unlockedCoupons"), where("userId", "==", userId)),
  );
  return snap.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })) as UnlockedCoupon[];
}

export async function trackCouponClick(userId: string, couponOfferId: string) {
  if (!db) return;
  await addDoc(collection(db, "couponClicks"), {
    userId,
    couponOfferId,
    clickedAt: new Date().toISOString(),
    source: "marketplace",
  });
}

export async function syncExternalCoupons() {
  return couponOffers;
}
