"use client";

import { Calendar, MapPin, Clock, BookOpen, ChevronRight } from "lucide-react";
import { motion, MotionConfig } from "motion/react";
import { useRouter } from "next/navigation";
import { Reveal } from "./motion/Reveal";

const events = [
  {
    date: "28–29 Jun 2026",
    title: "Women's Conference",
    theme: "Walking in Faith",
    verse: "Hebrews 11:1",
    location: "Main Sanctuary",
    time: "9:00 AM – 4:00 PM",
    leader: "Mrs. Ruth Santos",
    description: "A two-day conference for women of all ages. Featuring worship, keynote sessions, breakaways, and fellowship.",
    status: "Registration Open",
    capacity: "150 seats",
    image: "/images/event-women.jpg",
  },
  {
    date: "12–14 Jul 2026",
    title: "Youth Camp 2026",
    theme: "Rooted & Built Up",
    verse: "Colossians 2:7",
    location: "Camp Canaan, Balamban, Cebu",
    time: "Depart 7:00 AM",
    leader: "Pastor Sarah Garcia",
    description: "Annual youth camp for teens aged 13–25. Three days of worship, teaching, outdoor activities, and community building.",
    status: "Registration Open",
    capacity: "80 spots",
    image: "/images/event-youth.jpg",
  },
  {
    date: "19 Jul 2026",
    title: "Community Outreach",
    theme: "Love in Action",
    verse: "James 2:17",
    location: "Inayagan, Minglanilla",
    time: "8:00 AM – 1:00 PM",
    leader: "Elder Joseph Reyes",
    description: "Monthly outreach to Inayagan. Volunteers serve at the food kitchen, conduct door-to-door prayer walks, and distribute care packs.",
    status: "Open to All",
    capacity: "Unlimited",
    image: "/images/event-outreach.jpg",
  },
  {
    date: "3 Aug 2026",
    title: "Family Fun Day",
    theme: "Growing Together",
    verse: "Psalm 133:1",
    location: "Church Grounds",
    time: "10:00 AM – 4:00 PM",
    leader: "Various Ministry Leaders",
    description: "A day of games, food, fellowship, and fun for the whole family. Bring your friends and neighbours!",
    status: "Coming Soon",
    capacity: "Open entry",
    image: "/images/ministry-1.jpg",
  },
];

export function EventsPage() {
  const router = useRouter();
  const onNavigate = (page: string) =>
    router.push(page === "home" ? "/" : `/${page}`);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen">
        {/* Hero */}
        <section className="relative overflow-hidden mesh-navy grain cross-pattern py-20">
          <Reveal className="relative max-w-4xl mx-auto px-6 text-center">
            <div className="text-accent text-xs uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
              <div className="w-6 h-px bg-accent" /> Events & Activities <div className="w-6 h-px bg-accent" />
            </div>
            <h1 className="text-white tracking-tight" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 600 }}>
              Upcoming Events
            </h1>
            <p className="text-white/70 mt-3 text-lg">Join us as we grow together — in faith, in fellowship, and in service to our community.</p>
          </Reveal>
        </section>

        <section className="max-w-5xl mx-auto px-6 py-16">
          <Reveal>
            <div className="mb-10">
              <div className="text-accent text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                <div className="w-6 h-px bg-accent" /> What's On
              </div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.25rem", fontWeight: 600 }} className="tracking-tight">
                Mark Your Calendar
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {events.map((e, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg hover:border-accent/40 transition-shadow group h-full flex flex-col"
                >
                  {/* arch-topped image banner with date/time overlay */}
                  <div className="relative arch-sm overflow-hidden h-44">
                    <img
                      src={e.image}
                      alt={e.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
                    <div className="absolute top-3 right-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full backdrop-blur-sm ${
                        e.status === "Registration Open" ? "bg-accent/80 text-white" :
                        e.status === "Open to All" ? "bg-tertiary/80 text-white" :
                        "bg-primary/60 text-white/90"
                      }`}>
                        {e.status}
                      </span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 px-5 py-3 flex items-center justify-between">
                      <span className="text-white text-xs uppercase tracking-widest font-medium">{e.date}</span>
                      <span className="text-accent text-xs bg-primary/60 px-2 py-0.5 rounded backdrop-blur-sm flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {e.time}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 600 }}>
                      {e.title}
                    </h3>
                    <div className="text-accent text-sm italic mt-0.5 mb-3">"{e.theme}"</div>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{e.description}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-4 mt-auto">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{e.location}</span>
                      <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{e.verse}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Leader: {e.leader}</span>
                    </div>
                    {e.status !== "Coming Soon" && (
                      <motion.button
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="px-5 py-2 text-sm bg-pop text-white hover:bg-pop/90 rounded transition-colors flex items-center gap-1.5 self-start shadow-lg shadow-pop/20"
                      >
                        Register Now <ChevronRight className="w-3.5 h-3.5" />
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA band */}
        <section className="relative overflow-hidden mesh-navy grain cross-pattern py-20">
          <Reveal className="relative max-w-3xl mx-auto px-6 text-center">
            <div className="text-accent text-xs uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
              <div className="w-6 h-px bg-accent" /> Get Involved <div className="w-6 h-px bg-accent" />
            </div>
            <h2
              className="text-white mb-4 tracking-tight"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600 }}
            >
              Want to Help Make It Happen?
            </h2>
            <p className="text-white/70 mb-8 text-lg">
              Our events are powered by volunteers who give their time and gifts. Reach out and find your place to serve.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate("contact")}
                className="px-8 py-3 bg-pop text-white hover:bg-pop/90 rounded transition-colors shadow-lg shadow-pop/20"
              >
                Volunteer With Us
              </motion.button>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate("visitor")}
                className="px-8 py-3 border border-white/30 text-white hover:bg-white/10 rounded transition-colors"
              >
                Plan Your Visit
              </motion.button>
            </div>
          </Reveal>
        </section>
      </div>
    </MotionConfig>
  );
}
