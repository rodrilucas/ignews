import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  writeBatch,
  Firestore,
  CollectionReference,
} from "firebase/firestore/lite";
import type {
  IFirebaseRepository,
  FindUnique,
  FindMany,
  UpdateOne,
  UpdateMany,
  FindUserWithActiveSubscription,
} from ".";
import { adminDb } from "@/lib/firebaseAdmin";

export class FirebaseRepository<T extends { id: string }>
  implements IFirebaseRepository<T>
{
  private readonly collectionRef: CollectionReference;

  constructor(
    private readonly db: Firestore,
    collectionName: string
  ) {
    this.collectionRef = collection(db, collectionName);
  }

  async create(data: Omit<T, "id">): Promise<void> {
    await adminDb.collection("users").add(data);
  }

  async findUnique({ field, value }: FindUnique<T>): Promise<T | null> {
    const usersRef = adminDb.collection(this.collectionRef.path);
    const q = usersRef.where(field as string, "==", value);
    const snap = await q.get();
    if (snap.empty) return null;
    const docSnap = snap.docs[0];
    return { id: docSnap.id, ...docSnap.data() } as T;
  }

  async findMany({ filters }: FindMany<T>): Promise<T[]> {
    const constraints = Object.entries(filters).map(([field, value]) =>
      where(field, "==", value)
    );

    const q = query(this.collectionRef, ...constraints);
    const snap = await getDocs(q);
    return snap.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    })) as T[];
  }

  async updateOne({ id, data }: UpdateOne<T>): Promise<boolean> {
    const docRef = doc(this.collectionRef, id);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _, ...rest } = data;
    await updateDoc(docRef, rest);
    return true;
  }

  async updateMany({ filters, data }: UpdateMany<T>): Promise<boolean> {
    const constraints = Object.entries(filters).map(([field, value]) =>
      where(field, "==", value)
    );

    const q = query(this.collectionRef, ...constraints);
    const snap = await getDocs(q);
    if (snap.empty) return false;

    const batch = writeBatch(this.db);

    const safeData = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    snap.forEach((docSnap) => {
      const ref = doc(this.db, this.collectionRef.path, docSnap.id);
      batch.update(ref, safeData);
    });

    await batch.commit();

    return true;
  }

  async findUserWithActiveSubscription({
    field,
    value,
  }: FindUserWithActiveSubscription<T>) {
    const usersRef = collection(this.db, "users");
    const userQuery = query(usersRef, where(field as string, "==", value));
    const userSnap = await getDocs(userQuery);
    const getByIndex = 0;

    if (userSnap.empty) return null;

    const userDoc = userSnap.docs[getByIndex];
    const userData = userDoc.data() as { stripe_customer_id: string };

    const subsRef = collection(this.db, "subscriptions");
    const subQuery = query(
      subsRef,
      where("user_id", "==", userData.stripe_customer_id),
      where("status", "==", "active")
    );
    const subSnap = await getDocs(subQuery);

    if (subSnap.empty) return null;

    const subscriptionDoc = subSnap.docs[getByIndex];

    return { ...subscriptionDoc.data() } as T;
  }
}
