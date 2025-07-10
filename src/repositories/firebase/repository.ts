import {
  addDoc,
  collection,
  query,
  getDocs,
  where,
  updateDoc,
  doc,
  Firestore,
} from "firebase/firestore/lite";

import type { IFirebaseRepository, FindManyData, UpdateData } from ".";

export class FirebaseRepository<T extends { id: string }>
  implements IFirebaseRepository<T>
{
  private readonly collectionRef;

  constructor(private readonly db: Firestore, collectionName: string) {
    this.collectionRef = collection(db, collectionName);
  }

  async create(data: Omit<T, "id">): Promise<void> {
    await addDoc(this.collectionRef, data);
  }

  async findUnique({ data }: FindManyData<T>): Promise<T | null> {
    const q = query(
      this.collectionRef,
      where(data.field as string, "==", data.value)
    );
    const snap = await getDocs(q);

    if (snap.empty) return null;

    const docSnap = snap.docs[0];
    return { id: docSnap.id, ...docSnap.data() } as T;
  }

  async update({ data }: UpdateData<T>): Promise<void> {
    const docRef = doc(this.collectionRef, data.id);
    const { id, ...rest } = data;
    await updateDoc(docRef, rest);
  }
}
