"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "events", label: "Events" },
  { id: "sermons", label: "Sermons" },
  { id: "giving", label: "Give" },
  { id: "prayer", label: "Prayer" },
  { id: "contact", label: "Contact" },
];

/** Map a nav id to its App Router href ("home" -> "/", otherwise "/<id>"). */
const hrefFor = (id: string) => (id === "home" ? "/" : `/${id}`);

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Derive the active nav id from the current path ("/" -> "home").
  const activePage = pathname === "/" ? "home" : pathname.replace(/^\//, "");

  const handleNav = (id: string) => {
    router.push(hrefFor(id));
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <button
          onClick={() => handleNav("home")}
          className="flex items-center gap-2.5 group"
        >
          <img
            src="/ecc_logo.png"
            alt="Evangelical Community Church logo"
            className="w-9 h-9 object-contain"
          />
          <div className="text-left">
            <div
              className="text-white leading-none tracking-wide"
              style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 600 }}
            >
              Evangelical Community
            </div>
            <div className="text-white/50 text-xs tracking-widest uppercase">Church</div>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`px-3 py-1.5 text-sm rounded transition-colors ${
                activePage === link.id
                  ? "text-accent bg-white/10"
                  : "text-white/75 hover:text-white hover:bg-white/8"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA + admin */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => handleNav("visitor")}
            className="px-4 py-1.5 text-sm border border-pop/60 text-pop hover:bg-pop hover:text-white rounded transition-colors"
          >
            Plan Your Visit
          </button>
          <button
            onClick={() => handleNav("admin")}
            className="px-4 py-1.5 text-sm bg-white/10 text-white hover:bg-white/20 rounded transition-colors"
          >
            Admin
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-white p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-primary border-t border-white/10 px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`text-left px-3 py-2 text-sm rounded transition-colors ${
                activePage === link.id
                  ? "text-accent bg-white/10"
                  : "text-white/75 hover:text-white"
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => handleNav("visitor")}
              className="px-4 py-2 text-sm border border-pop/60 text-pop rounded"
            >
              Plan Your Visit
            </button>
            <button
              onClick={() => handleNav("admin")}
              className="px-4 py-2 text-sm bg-white/10 text-white rounded"
            >
              Admin Dashboard
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
