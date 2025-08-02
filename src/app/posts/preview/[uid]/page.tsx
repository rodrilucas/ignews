import Post from "@/components/Post";
import Reading from "@/components/Reading";
import { createClient } from "@/lib/prismicio";
import { asDate, RichTextField } from "@prismicio/client";
import { asText } from "@prismicio/client/richtext";
import { PrismicRichText } from "@prismicio/react";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Fragment } from "react";

type Params = {
  uid: string;
};

export async function generateStaticParams() {
  const client = createClient();
  const posts = await client.getAllByType("post");
  return posts.map((post) => ({ uid: post.uid }));
}

export const dynamicParams = true;
export const revalidate = 1800;

export default async function PostPagePreview({
  params,
}: {
  params: Promise<Params>;
}) {
  const session = await getSession();
  const { uid } = await params;

  if (
    session &&
    session.subscription &&
    session.subscription.status === "active"
  ) {
    redirect(`/posts/${uid}`);
  }

  const client = createClient();
  const post = await client.getByUID("post", uid);

  const previewContent = post.data.content.splice(0, 4) as RichTextField;

  const formattedPost = {
    title: asText(post.data.title),
    date: asDate(post.first_publication_date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    content: <PrismicRichText field={previewContent} />,
    preview: true,
  };

  return (
    <Fragment>
      <Post {...formattedPost} />
      <Reading />
    </Fragment>
  );
}
