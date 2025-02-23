import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "./components/Sidebar";  // ✅ Import Sidebar
// import SidebarDC from "./components/SidebarDC";  // ✅ Import Sidebar
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex h-screen">
          <Sidebar/> {/* ✅ เพิ่ม Sidebar ตรงนี้ */}
          <main className="flex-1 p-6 bg-gray-50">{children}</main> {/* ✅ ส่วน Content */}
        </div>
      </body>
    </html>
  );
}
