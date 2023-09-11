import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";

const mainFont = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Lista de tarefas",
  description: "App de lista de tarefas",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt_br">
      <body className={mainFont.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
