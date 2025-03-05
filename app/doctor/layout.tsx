"use client";
import { DoctorProvider } from "../contexts/DoctorContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DoctorProvider>{children}</DoctorProvider>;
}
