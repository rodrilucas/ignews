import Image from "next/image";
import styles from "./styles.module.scss";
import SignInButton from "../SignInButton";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Image
          src={"/images/logo.svg"}
          alt="ig.news"
          width={100}
          height={100}
        />
        <nav>
          <a className={styles.active}>Home</a>
          <a>Posts</a>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}
