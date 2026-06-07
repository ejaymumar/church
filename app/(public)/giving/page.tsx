import type { Metadata } from "next";
import { GivingPage } from "@/app/components/GivingPage";

export const metadata: Metadata = {
  title: "Give | Evangelical Community Church",
  description:
    "Support the ministry of Evangelical Community Church through tithes and offerings.",
};

export default function Page() {
  return <GivingPage />;
}
