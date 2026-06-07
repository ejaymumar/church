import type { Metadata } from "next";
import { ServicesPage } from "@/app/components/ServicesPage";

export const metadata: Metadata = {
  title: "Services | Evangelical Community Church",
  description:
    "Weekly and special service times at Evangelical Community Church.",
};

export default function Page() {
  return <ServicesPage />;
}
