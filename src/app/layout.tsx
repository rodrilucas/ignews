import { Roboto, Roboto_Mono } from "next/font/google";
import "@/styles/globals.scss";

const roboto = Roboto({
  variable: "--font-roboto",
  display: "swap",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
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
      <body className={`${roboto.className} ${robotoMono.className}`}>
        {children}
      </body>
    </html>
  );
}
