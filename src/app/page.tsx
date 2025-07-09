import styles from "./home.module.scss";
import Header from "@/components/Header";
import Image from "next/image";
import { Fragment } from "react";
import { SubscribeButton } from "@/components/SubscribeButton";
import { loadFormattedProduct } from "@/services/load-formatted-product";

export const revalidate = 60 * 60 * 24;

export default async function Home() {
  const product = await loadFormattedProduct("price_1Rig7EB6psMdNg5F2x0CzYJg");

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
            <span>for ${product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId}/>
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
