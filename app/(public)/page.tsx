import type { Metadata } from "next";
import { HomePage } from "@/app/components/HomePage";

export const metadata: Metadata = {
  title: "Evangelical Community Church",
  description:
    "Welcome to Evangelical Community Church — join us for worship, community, and growth.",
};

export default function Page() {
  return <HomePage />;
}
