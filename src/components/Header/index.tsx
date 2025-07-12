import Image from "next/image";
import styles from "./styles.module.scss";
import SignInButton from "../SignInButton";
import { randomUUID } from "crypto";
import { ActiveLink } from "../ActiveLink";

const links = [
  { to: "/", title: "Home" },
  { to: "/posts", title: "Posts" },
];

export default function Header() {
  const renderedLinks = links.map((link) => {
    const id = randomUUID();
    return (
      <ActiveLink key={id} to={link.to}>
        {link.title}
      </ActiveLink>
    );
  });

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Image
          src={"/images/logo.svg"}
          alt="ig.news"
          width={100}
          height={100}
        />
        <nav>{renderedLinks}</nav>
        <SignInButton />
      </div>
    </header>
  );
}
