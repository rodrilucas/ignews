import styles from "./styles.module.scss";

type PostContentProps = {
  children: React.ReactNode;
  preview: boolean;
};

export default function PostContent({ preview, children }: PostContentProps) {
  return (
    <div className={`${styles.content} ${preview ? styles.preview : ""}`}>
      {children}
    </div>
  );
}
