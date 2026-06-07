import type { Metadata } from "next";
import { ContactPage } from "@/app/components/ContactPage";

export const metadata: Metadata = {
  title: "Contact | Evangelical Community Church",
  description:
    "Find our location, send an enquiry, and connect with Evangelical Community Church.",
};

export default function Page() {
  return <ContactPage />;
}
