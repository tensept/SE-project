"use client";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "./components/Sidebar";  // ✅ Import Sidebar
import SidebarDC from "./components/SidebarDC";  // ✅ Import Sidebar
import "./globals.css";
import { useEffect, useState } from "react";
import { parseCookies } from "./utils/cookies";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userInfo, setUserInfo] = useState({ citizenID: '', token: '', role: '' });
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const cookies = parseCookies();
    setUserInfo({
      citizenID: cookies.citizenID || '',
      token: cookies.token || '',
      role: cookies.role || '',
    });
  }, []);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const path = process.env.NEXT_PUBLIC_BACK_END;
        const response = await fetch(`${path}/getRole`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Role": userInfo.role,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch role");
        }

        const data = await response.json();
        setRole(data);  // Set the role from the fetched data
      } catch (error) {
        console.error("Error fetching role:", error);
      }
    };

    fetchRole();
  }, [userInfo]);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex h-screen">
           {role=='doctor'?<SidebarDC />:<Sidebar />} {/* ✅ Sidebar */}
          <main className="flex-1 p-6 bg-gray-50">{children}</main> {/* ✅ Content section */}
        </div>
      </body>
    </html>
  );
}
