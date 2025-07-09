"use client";

import { FaGithub } from "react-icons/fa6";
import { FiX } from "react-icons/fi";
import styles from "./styles.module.scss";
import { signIn, signOut, useSession } from "next-auth/react";

export default function SignInButton() {
  const { data: session } = useSession();

  return session ? (
    <button className={styles.button} type="button" onClick={() => signOut()}>
      <FaGithub color="#04d361" />
      {session.user?.name}
      <FiX color="#737380" className={styles.close} />
    </button>
  ) : (
    <button
      className={styles.button}
      type="button"
      onClick={() => signIn("github")}
    >
      <FaGithub color="#eba417" />
      Sign in with Github
    </button>
  );
}
