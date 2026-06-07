import type { Metadata } from "next";
import { VisitorFormPage } from "@/app/components/VisitorFormPage";

export const metadata: Metadata = {
  title: "Plan Your Visit | Evangelical Community Church",
  description:
    "Planning your first visit? Let us know you're coming so we can welcome you.",
};

export default function Page() {
  return <VisitorFormPage />;
}
