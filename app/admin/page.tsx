import type { Metadata } from "next";
import { AdminDashboard } from "@/app/components/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard | Evangelical Community Church",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AdminDashboard />;
}
