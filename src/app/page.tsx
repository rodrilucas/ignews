import styles from "./home.module.scss";
import Image from "next/image";
import { SubscribeButton } from "@/components/SubscribeButton";
import { loadFormattedProduct } from "@/services/load-formatted-product";
import { env } from "@/env/env.server";

export const revalidate = 86400;

export default async function Home() {
  const product = await loadFormattedProduct(env.STRIPE_PRICE);

  return (
    <section className={styles.content}>
      <div className={styles.hero}>
        <span>Hey, Welcome</span>
        <h1>
          News about the <span>React</span> world.
        </h1>
        <p>
          Get access to all the publications <br />
          <span>for ${product.amount} month</span>
        </p>
        <SubscribeButton priceId={product.priceId} />
      </div>
      <Image
        src={"/images/avatar.svg"}
        alt="Girl coding"
        width={100}
        height={100}
      />
    </section>
  );
}
