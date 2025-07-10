import { env } from "@/env/env.server";
import { type FirebaseOptions, initializeApp } from "firebase/app";

const firebaseOptions: FirebaseOptions = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_API_ID,
};

export const app = initializeApp(firebaseOptions);
