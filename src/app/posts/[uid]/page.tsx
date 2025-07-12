import Post from "@/components/Post";
import { createClient } from "@/lib/prismicio";
import { asDate } from "@prismicio/client";
import { asText } from "@prismicio/client/richtext";
import { PrismicRichText } from "@prismicio/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

type Params = {
  uid: string;
};

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const session = await getServerSession(authOptions);
  const { uid } = await params;

  if (
    !session ||
    !session.subscription ||
    session.subscription.status !== "active"
  ) {
    redirect(`/posts/preview/${uid}`);
  }

  const client = createClient();
  const post = await client.getByUID("post", uid);

  const formattedPost = {
    title: asText(post.data.title),
    date: asDate(post.first_publication_date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    content: <PrismicRichText field={post.data.content} />,
    preview: false,
  };

  return <Post {...formattedPost} />;
}
