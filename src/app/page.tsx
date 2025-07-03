import styles from "./home.module.scss";
import Header from "@/components/Header";
import { Fragment } from "react";
import Image from "next/image";
import { SubscribeButton } from "@/components/SubscribeButton";

export default function Home() {
  return (
    <Fragment>
      <Header />
      <main className={styles.content}>
        <section className={styles.hero}>
          <span>Hey, Welcome</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for $9.99 month</span>
          </p>
          <SubscribeButton />
        </section>
        <Image
          src={"/images/avatar.svg"}
          alt="Girl coding"
          width={100}
          height={100}
        />
      </main>
    </Fragment>
  );
}
