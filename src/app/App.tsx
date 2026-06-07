import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./components/HomePage";
import { AboutPage } from "./components/AboutPage";
import { ServicesPage } from "./components/ServicesPage";
import { VisitorFormPage } from "./components/VisitorFormPage";
import { AdminDashboard } from "./components/AdminDashboard";
import { SermonsPage } from "./components/SermonsPage";
import { GivingPage } from "./components/GivingPage";
import { PrayerPage } from "./components/PrayerPage";
import { EventsPage } from "./components/EventsPage";
import { ContactPage } from "./components/ContactPage";

type Page =
  | "home"
  | "about"
  | "services"
  | "events"
  | "sermons"
  | "giving"
  | "prayer"
  | "contact"
  | "visitor"
  | "admin";

const pages: Page[] = [
  "home", "about", "services", "events", "sermons",
  "giving", "prayer", "contact", "visitor", "admin",
];

// Read the current page from the URL hash (e.g. "#about" -> "about").
// Falls back to "home" for an empty or unknown hash.
function getPageFromHash(): Page {
  const hash = window.location.hash.replace(/^#/, "");
  return pages.includes(hash as Page) ? (hash as Page) : "home";
}

export default function App() {
  const [page, setPage] = useState<Page>(getPageFromHash);

  // Keep the page in sync with the URL hash so refresh / back / forward
  // and direct deep-links land on the right page.
  useEffect(() => {
    const onHashChange = () => setPage(getPageFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Navigating updates the hash; the hashchange listener updates state.
  const navigate = (p: string) => {
    window.location.hash = p;
  };

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage onNavigate={navigate} />;
      case "about": return <AboutPage />;
      case "services": return <ServicesPage />;
      case "events": return <EventsPage onNavigate={navigate} />;
      case "sermons": return <SermonsPage />;
      case "giving": return <GivingPage />;
      case "prayer": return <PrayerPage />;
      case "contact": return <ContactPage />;
      case "visitor": return <VisitorFormPage />;
      case "admin": return <AdminDashboard onNavigate={navigate} />;
      default: return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "var(--font-body)" }}>
      {page !== "admin" && (
        <Navbar activePage={page} onNavigate={(p) => navigate(p as Page)} />
      )}
      {renderPage()}
    </div>
  );
}
