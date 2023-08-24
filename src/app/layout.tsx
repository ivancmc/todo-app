import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lista de tarefas",
  description: "App de lista de tarefas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt_br">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
