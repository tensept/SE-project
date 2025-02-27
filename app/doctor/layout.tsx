"use client";
import { DoctorProvider } from "./DoctorContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DoctorProvider>{children}</DoctorProvider>;
}
