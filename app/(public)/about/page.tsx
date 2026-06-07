import type { Metadata } from "next";
import { AboutPage } from "@/app/components/AboutPage";

export const metadata: Metadata = {
  title: "About | Evangelical Community Church",
  description:
    "Our mission, vision, leadership, and the path of discipleship at Evangelical Community Church.",
};

export default function Page() {
  return <AboutPage />;
}
