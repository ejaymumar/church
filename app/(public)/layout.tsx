import { Navbar } from "@/app/components/Navbar";

/**
 * Layout for all public-facing routes. Renders the site Navbar above the page.
 * The admin dashboard lives outside this group, so it renders full-screen with
 * no Navbar — matching the prototype's behavior.
 */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
