import styles from "./styles.module.scss";
import Link from "next/link";
import { createClient } from "@/lib/prismicio";
import { notFound } from "next/navigation";
import { asDate } from "@prismicio/client";
import { asText } from "@prismicio/client/richtext";

export default async function Posts() {
  const client = createClient();
  const posts = await client.getAllByType("post", {
    orderings: {
      field: "document.first_publication_date",
      direction: "desc",
    },
    pageSize: 100,
  });

  if (!posts) return notFound();

  const renderedPosts = posts.map((post) => {
    const date = asDate(post.first_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );
    const title = asText(post.data.title);
    const firstParagraph = post.data.content.find(
      (block) => block.type === "paragraph"
    );

    const excerpt = firstParagraph ? asText([firstParagraph]) : "";

    return (
      <Link key={post.id} href={`/posts/${post.uid}`}>
        <time>{date}</time>
        <strong>{title}</strong>
        <p>{excerpt.concat("...")}</p>
      </Link>
    );
  });

  return (
    <section className={styles.section}>
      <div className={styles.posts}>{renderedPosts}</div>
    </section>
  );
}
