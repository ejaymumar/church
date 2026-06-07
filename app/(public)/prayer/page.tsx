import type { Metadata } from "next";
import { PrayerPage } from "@/app/components/PrayerPage";

export const metadata: Metadata = {
  title: "Prayer | Evangelical Community Church",
  description:
    "Submit a prayer request and join the community prayer wall at Evangelical Community Church.",
};

export default function Page() {
  return <PrayerPage />;
}
