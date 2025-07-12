import PostContent from "../PostContent";
import styles from "./styles.module.scss";

type PostProps = {
  title: string;
  date: string;
  content: React.ReactNode;
  preview: boolean;
};

export default function Post({ title, date, content, preview }: PostProps) {
  return (
    <article className={styles.article}>
      <div className={styles.post}>
        <h1>{title}</h1>
        <time>{date}</time>
        <PostContent preview={preview}>{content}</PostContent>
      </div>
    </article>
  );
}
