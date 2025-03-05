"use client";
import { DiaryProvider } from "../../contexts/DiaryContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DiaryProvider>{children}</DiaryProvider>;
}
