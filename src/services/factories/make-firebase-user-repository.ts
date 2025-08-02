import { FirebaseRepository } from "@/repositories/firebase/repository";
import { adminDb } from "@/lib/firebaseAdmin";

type User = {
  id: string;
  email?: string;
  stripe_customer_id?: string;
};

export function makeFirebaseUserRepository() {
  return new FirebaseRepository<User>(adminDb, "users");
}
