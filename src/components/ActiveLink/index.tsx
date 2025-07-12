"use client";

import Link from "next/link";
import styles from "./styles.module.scss";
import { usePathname } from "next/navigation";

type ActiveLinkProps = {
  children: React.ReactNode;
  to: string;
};

export function ActiveLink({ children, to }: ActiveLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === to || pathname.startsWith(`${to}/`);

  return (
    <Link
      className={`${styles.link} ${isActive ? styles.active : ""}`}
      href={to}
    >
      {children}
    </Link>
  );
}
