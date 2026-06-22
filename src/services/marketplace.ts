import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";
import { marketplaceItems } from "../data/mockData";
import type { MarketplaceItem } from "../types";

export async function fetchMarketplaceItems() {
  if (!db) return marketplaceItems;
  const snap = await getDocs(
    query(collection(db, "marketplaceItems"), where("active", "==", true)),
  );
  return snap.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })) as MarketplaceItem[];
}
