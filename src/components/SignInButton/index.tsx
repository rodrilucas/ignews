import { FaGithub } from "react-icons/fa6";
import { FiX } from "react-icons/fi";
import styles from "./styles.module.scss";

export default function SignInButton() {
  const isUserLoggedIn = true;

  return isUserLoggedIn ? (
    <button className={styles.button} type="button">
      <FaGithub color="#04d361" />
      Lucas Rodrigues
      <FiX color="#737380" className={styles.close} />
    </button>
  ) : (
    <button className={styles.button} type="button">
      <FaGithub color="#eba417" />
      Sign in with Github
    </button>
  );
}
