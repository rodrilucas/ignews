"use client";

import Link from "next/link";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";

export default function Reading() {
  const router = useRouter();
  return (
    <div className={styles.reading}>
      Wanna continue reading?
      <Link href="/">
        <span onClick={() => router.push("/")}>Subscribe now 🤗</span>
      </Link>
    </div>
  );
}
