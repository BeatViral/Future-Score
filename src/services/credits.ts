import { addDoc, collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";
import { creditTransactions } from "../data/mockData";
import type { CreditTransaction } from "../types";

export async function fetchCreditTransactions(userId: string) {
  if (!db) return creditTransactions.filter((tx) => tx.userId === userId);

  const snap = await getDocs(
    query(
      collection(db, "creditTransactions"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
    ),
  );
  return snap.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })) as CreditTransaction[];
}

export async function addCreditTransaction(transaction: Omit<CreditTransaction, "id">) {
  if (!db) {
    return { id: `local-tx-${Date.now()}`, ...transaction };
  }
  const ref = await addDoc(collection(db, "creditTransactions"), transaction);
  return { id: ref.id, ...transaction };
}
