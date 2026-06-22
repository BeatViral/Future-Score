import { addDoc, collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";
import { mockPredictions } from "../data/mockData";
import type { Prediction } from "../types";

export async function fetchPredictions(filters?: { userId?: string }) {
  if (!db) {
    return filters?.userId
      ? mockPredictions.filter((prediction) => prediction.userId === filters.userId)
      : mockPredictions;
  }

  const constraints = filters?.userId
    ? [where("userId", "==", filters.userId), orderBy("createdAt", "desc")]
    : [orderBy("createdAt", "desc")];
  const snap = await getDocs(query(collection(db, "predictions"), ...constraints));
  return snap.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })) as Prediction[];
}

export async function createPrediction(prediction: Omit<Prediction, "id">) {
  if (!db) {
    return {
      id: `local-${Date.now()}`,
      ...prediction,
    } satisfies Prediction;
  }

  const ref = await addDoc(collection(db, "predictions"), prediction);
  return { id: ref.id, ...prediction } satisfies Prediction;
}
