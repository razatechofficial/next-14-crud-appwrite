import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next-14 Crud-Appwrite",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Create a Header */}
        <div className="max-w-3xl mx-auto">
          <header className="p-6 border-b flex items-center justify-between bg-sky-800 text-white rounded-bl-lg rounded-br-lg">
            <Link className="text-2xl font-bold" href={"/"}>
              Next-14 Crud
            </Link>
            <Link
              className="bg-sky-600 grid place-items-center py-2 px-4 rounded-sm font-bold shadow-2xl"
              href={"/create"}
            >
              Add New
            </Link>
          </header>
          <main className="p-4 text-lg">{children}</main>
        </div>
      </body>
    </html>
  );
}