import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Minha Aplicação",
  description: "Uma aplicação com fonte personalizada",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="font-sans bg-gray-100 dark:bg-gray-900">{children}</body>
    </html>
  );
}
