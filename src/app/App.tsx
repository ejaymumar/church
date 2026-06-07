import { useState } from "react";
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

export default function App() {
  const [page, setPage] = useState<Page>("home");

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage onNavigate={setPage} />;
      case "about": return <AboutPage />;
      case "services": return <ServicesPage />;
      case "events": return <EventsPage onNavigate={setPage} />;
      case "sermons": return <SermonsPage />;
      case "giving": return <GivingPage />;
      case "prayer": return <PrayerPage />;
      case "contact": return <ContactPage />;
      case "visitor": return <VisitorFormPage />;
      case "admin": return <AdminDashboard />;
      default: return <HomePage onNavigate={setPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "var(--font-body)" }}>
      {page !== "admin" && (
        <Navbar activePage={page} onNavigate={(p) => setPage(p as Page)} />
      )}
      {renderPage()}
    </div>
  );
}
