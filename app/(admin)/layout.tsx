import { Provider } from "@/components/admin/Provider";
import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Layout from "@/components/admin/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecommerce App",
  description: "The Best platform for products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <Provider attribute="class" defaultTheme="dark">
          <Layout>{children}</Layout>
        </Provider>
      </body>
    </html>
  );
}
