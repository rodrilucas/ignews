import { app } from "@/lib/firebase";
import { getFirestore } from "firebase/firestore/lite";

export const db = getFirestore(app);