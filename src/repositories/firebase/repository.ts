import {
  CollectionReference,
  DocumentData,
  Firestore,
} from "firebase-admin/firestore";
import {
  IFirebaseRepository,
  FindUnique,
  FindMany,
  UpdateOne,
  UpdateMany,
  FindUserWithActiveSubscription,
} from "@/repositories/firebase/contracts/firebaseRepository";

export class FirebaseRepository<T extends { id: string }>
  implements IFirebaseRepository<T>
{
  private readonly collectionRef: CollectionReference<DocumentData>;

  constructor(
    private readonly db: Firestore,
    private readonly collectionName: string
  ) {
    this.collectionRef = db.collection(this.collectionName);
  }

  async create(data: Omit<T, "id">): Promise<void> {
    await this.collectionRef.add(data);
  }

  async findUnique({ field, value }: FindUnique<T>): Promise<T | null> {
    const snapshot = await this.collectionRef.where(field as string, "==", value).limit(1).get();
    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as T;
  }

  async findMany({ filters }: FindMany<T>): Promise<T[]> {
    let queryRef: FirebaseFirestore.Query = this.collectionRef;
    for (const [field, value] of Object.entries(filters)) {
      queryRef = queryRef.where(field, "==", value);
    }

    const snapshot = await queryRef.get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as T[];
  }

  async updateOne({ id, data }: UpdateOne<T>): Promise<boolean> {
    const docRef = this.collectionRef.doc(id);
    await docRef.update(data);
    return true;
  }

  async updateMany({ filters, data }: UpdateMany<T>): Promise<boolean> {
    let queryRef: FirebaseFirestore.Query = this.collectionRef;
    for (const [field, value] of Object.entries(filters)) {
      queryRef = queryRef.where(field, "==", value);
    }

    const snapshot = await queryRef.get();
    if (snapshot.empty) return false;

    const batch = this.db.batch();
    snapshot.forEach((doc) => {
      batch.update(doc.ref, data as T);
    });

    await batch.commit();
    return true;
  }

  async findUserWithActiveSubscription({
    field,
    value,
  }: FindUserWithActiveSubscription<T>): Promise<T | null> {
    const usersRef = this.db.collection("users");
    const userSnap = await usersRef.where(field as string, "==", value).limit(1).get();

    if (userSnap.empty) return null;

    const userDoc = userSnap.docs[0];
    const userData = userDoc.data() as { stripe_customer_id: string };

    const subsRef = this.db.collection("subscriptions");
    const subSnap = await subsRef
      .where("user_id", "==", userData.stripe_customer_id)
      .where("status", "==", "active")
      .limit(1)
      .get();

    if (subSnap.empty) return null;

    const subDoc = subSnap.docs[0];
    return { id: subDoc.id, ...subDoc.data() } as T;
  }
}
