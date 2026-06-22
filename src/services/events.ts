import { collection, getDocs, query, where } from "firebase/firestore";
import { predictionEvents } from "../data/mockData";
import { db } from "../lib/firebase";
import type { PredictionEvent } from "../types";

export async function fetchPredictionEvents() {
  if (!db) return predictionEvents;
  const snap = await getDocs(
    query(collection(db, "predictionEvents"), where("featured", "==", true)),
  );
  return snap.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })) as PredictionEvent[];
}
