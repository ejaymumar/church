import type { Metadata } from "next";
import { SermonsPage } from "@/app/components/SermonsPage";

export const metadata: Metadata = {
  title: "Sermons | Evangelical Community Church",
  description:
    "Browse the sermon archive from Evangelical Community Church by speaker, series, and topic.",
};

export default function Page() {
  return <SermonsPage />;
}
