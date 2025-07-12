import { Roboto } from "next/font/google";
import Header from "@/components/Header";
import "@/styles/global.scss";
import SessionWrapper from "@/components/SessionWrapper";

const roboto = Roboto({
  variable: "--font-roboto",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
      </head>
      <body className={`${roboto.variable}`}>
        <SessionWrapper>
          <Header />
          <main>{children}</main>
        </SessionWrapper>
      </body>
    </html>
  );
}
