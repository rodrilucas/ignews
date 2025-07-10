import { FirebaseRepository } from "@/repositories/firebase/repository";
import { db } from "@/db";

type User = {
  id: string;
  email?: string;
  stripe_customer_id?: string;
};

export function makeFirebaseRepository() {
  return new FirebaseRepository<User>(db, "users");
}
