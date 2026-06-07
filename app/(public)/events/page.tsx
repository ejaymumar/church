import type { Metadata } from "next";
import { EventsPage } from "@/app/components/EventsPage";

export const metadata: Metadata = {
  title: "Events | Evangelical Community Church",
  description:
    "Upcoming events, conferences, and gatherings at Evangelical Community Church.",
};

export default function Page() {
  return <EventsPage />;
}
