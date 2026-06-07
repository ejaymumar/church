import { Calendar, Clock, MapPin, Play, Heart, BookOpen, ChevronRight, Bell, Users, Music } from "lucide-react";
import { motion, MotionConfig } from "motion/react";
import { Reveal, staggerContainer, staggerItem } from "./motion/Reveal";
import { CountUp } from "./motion/CountUp";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const announcements = [
  "Sunday Service is at 9:00 AM & 11:00 AM — All are welcome!",
  "Youth Camp registrations close 15 June 2026 — Limited spots available.",
  "Women's Conference: 'Walking in Faith' — 28–29 June 2026.",
];

const services = [
  { day: "Sunday", name: "Morning Worship", time: "9:00 AM", venue: "Main Sanctuary", type: "recurring" },
  { day: "Sunday", name: "Family Service", time: "11:00 AM", venue: "Main Sanctuary", type: "recurring" },
  { day: "Wednesday", name: "Bible Study & Prayer", time: "6:30 PM", venue: "Fellowship Hall", type: "recurring" },
  { day: "Friday", name: "Youth Service", time: "6:00 PM", venue: "Youth Centre", type: "recurring" },
];

const upcomingEvents = [
  {
    date: "28 Jun",
    title: "Women's Conference",
    theme: "Walking in Faith",
    verse: "Hebrews 11:1",
    location: "Main Sanctuary",
    time: "9:00 AM",
    image: "/images/event-women.jpg",
  },
  {
    date: "12 Jul",
    title: "Youth Camp 2026",
    theme: "Rooted & Built Up",
    verse: "Colossians 2:7",
    location: "Camp Canaan, Balamban, Cebu",
    time: "All day",
    image: "/images/event-youth.jpg",
  },
  {
    date: "19 Jul",
    title: "Outreach Saturday",
    theme: "Love in Action",
    verse: "James 2:17",
    location: "Inayagan, Minglanilla",
    time: "8:00 AM",
    image: "/images/event-outreach.jpg",
  },
];

const latestSermons = [
  {
    title: "The God Who Sees",
    speaker: "Pastor Daniel Santos",
    series: "Names of God",
    date: "1 Jun 2026",
    verse: "Genesis 16:13",
  },
  {
    title: "Faith Over Fear",
    speaker: "Pastor Daniel Santos",
    series: "Walking by Faith",
    date: "25 May 2026",
    verse: "Isaiah 41:10",
  },
  {
    title: "The Power of Gratitude",
    speaker: "Elder Maria Reyes",
    series: "A Thankful Heart",
    date: "18 May 2026",
    verse: "Psalm 100:4",
  },
];

const stats = [
  { icon: Users, label: "Active Members", value: 320, suffix: "+" },
  { icon: Calendar, label: "Weekly Services", value: 4, suffix: "" },
  { icon: Music, label: "Ministries", value: 12, suffix: "" },
  { icon: Heart, label: "Years of Grace", value: 28, suffix: "" },
];

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen">
        {/* Announcements Banner */}
        <div className="bg-accent text-white py-2 overflow-hidden">
          <div className="flex gap-16 animate-[marquee_30s_linear_infinite] whitespace-nowrap">
            {[...announcements, ...announcements].map((a, i) => (
              <span key={i} className="flex items-center gap-3 text-sm">
                <Bell className="w-3.5 h-3.5 flex-shrink-0" />
                {a}
              </span>
            ))}
          </div>
        </div>

        {/* Hero */}
        <section className="relative min-h-[88vh] grid items-center overflow-hidden mesh-navy grain cross-pattern">
          <img
            src="/images/hero.jpg"
            alt="Congregation worshipping together"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/55 to-transparent" />

          <div className="relative w-full max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={staggerContainer} initial="hidden" animate="show">
              <motion.div
                variants={staggerItem}
                className="inline-flex items-center gap-2 text-accent text-sm tracking-widest uppercase mb-6"
              >
                <div className="w-8 h-px bg-accent" />
                Minglanilla, Cebu, Philippines
              </motion.div>
              <motion.h1
                variants={staggerItem}
                className="text-white mb-6"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.6rem, 5vw, 4.5rem)", fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.01em" }}
              >
                A Place to<br />
                <em className="text-accent">Belong,</em><br />
                Grow & Serve
              </motion.h1>
              <motion.p variants={staggerItem} className="text-white/70 text-lg mb-8 max-w-md leading-relaxed">
                Evangelical Community Church is a Spirit-filled family committed to worship, discipleship, and transforming our community with the love of Christ.
              </motion.p>
              <motion.div variants={staggerItem} className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onNavigate("visitor")}
                  className="px-6 py-3 bg-pop text-white hover:bg-pop/90 rounded transition-colors shadow-lg shadow-pop/20"
                >
                  Plan Your Visit
                </motion.button>
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onNavigate("giving")}
                  className="px-6 py-3 border border-white/30 text-white hover:bg-white/10 rounded transition-colors flex items-center gap-2"
                >
                  <Heart className="w-4 h-4" /> Give Online
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Quick access panel — arch-topped to echo the logo */}
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="arch-sm bg-white/10 backdrop-blur-md border border-white/20 p-6 shadow-2xl">
                <div className="flex items-center gap-2 text-accent/90 text-xs uppercase tracking-widest mb-4">
                  <div className="w-5 h-px bg-accent/60" /> This Sunday
                </div>
                <div className="space-y-4">
                  {services.slice(0, 2).map((s, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-accent/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Clock className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">{s.name}</div>
                        <div className="text-white/60 text-xs">{s.time} · {s.venue}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/55">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    National Highway, Minglanilla, Cebu
                  </div>
                  <button
                    onClick={() => onNavigate("contact")}
                    className="text-accent hover:text-accent/80 transition-colors flex items-center gap-1"
                  >
                    Directions <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick stat bar */}
        <div className="bg-primary text-white cross-pattern">
          <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {stats.map(({ icon: Icon, label, value, suffix }) => (
              <div key={label} className="flex flex-col items-center py-2 px-4 text-center">
                <Icon className="w-4 h-4 text-accent mb-1" />
                <div className="text-2xl font-semibold tracking-tight">
                  <CountUp value={value} suffix={suffix} />
                </div>
                <div className="text-white/50 text-xs">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Services section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <Reveal>
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="text-accent text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                  <div className="w-6 h-px bg-accent" /> 01 — Services
                </div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.25rem", fontWeight: 600 }} className="tracking-tight">
                  Join Us in Worship
                </h2>
              </div>
              <button
                onClick={() => onNavigate("services")}
                className="hidden md:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                Full schedule <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((s, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="relative bg-card border border-border rounded-lg p-5 hover:shadow-lg hover:border-accent/40 transition-shadow group overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform" />
                  <div className="text-accent text-xs uppercase tracking-widest mb-3">{s.day}</div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 600 }} className="mb-2">
                    {s.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-1">
                    <Clock className="w-3.5 h-3.5" /> {s.time}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5" /> {s.venue}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="bg-secondary py-20">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <div className="text-accent text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                    <div className="w-6 h-px bg-accent" /> 02 — Events
                  </div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.25rem", fontWeight: 600 }} className="tracking-tight">
                    Upcoming Activities
                  </h2>
                </div>
                <button
                  onClick={() => onNavigate("events")}
                  className="hidden md:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  All events <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6">
              {upcomingEvents.map((e, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 280, damping: 20 }}
                    className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-xl transition-shadow group h-full"
                  >
                    {/* arch-topped image banner with date/time overlay */}
                    <div className="relative arch-sm overflow-hidden h-36">
                      <img
                        src={e.image}
                        alt={e.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 px-5 py-3 flex items-center justify-between">
                        <span className="text-white text-xs uppercase tracking-widest font-medium">{e.date}</span>
                        <span className="text-accent text-xs bg-primary/60 px-2 py-0.5 rounded backdrop-blur-sm">{e.time}</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 600 }} className="mb-1">
                        {e.title}
                      </h3>
                      <div className="text-accent text-sm italic mb-3">"{e.theme}"</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1.5 mb-1">
                        <BookOpen className="w-3.5 h-3.5" /> {e.verse}
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" /> {e.location}
                      </div>
                      <button className="mt-4 w-full py-2 text-sm border border-primary/20 text-primary hover:bg-primary hover:text-white rounded transition-colors">
                        Register Now
                      </button>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Sermons */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <Reveal>
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="text-accent text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                  <div className="w-6 h-px bg-accent" /> 03 — Media
                </div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.25rem", fontWeight: 600 }} className="tracking-tight">
                  Recent Sermons
                </h2>
              </div>
              <button
                onClick={() => onNavigate("sermons")}
                className="hidden md:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                Full library <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </Reveal>

          <div className="space-y-3">
            {latestSermons.map((s, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="bg-card border border-border rounded-lg px-5 py-4 flex items-center gap-5 hover:border-accent/40 hover:shadow-md transition-shadow group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/15 transition-colors">
                    <Play className="w-4 h-4 text-primary group-hover:text-accent transition-colors" fill="currentColor" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-medium truncate" style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem" }}>
                          {s.title}
                        </h3>
                        <div className="text-sm text-muted-foreground">{s.speaker}</div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-xs text-accent">{s.series}</div>
                        <div className="text-xs text-muted-foreground">{s.date}</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground hidden md:block flex-shrink-0 border-l border-border pl-5">
                    {s.verse}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Visit CTA */}
        <section className="relative overflow-hidden mesh-navy grain cross-pattern py-24">
          <img
            src="/images/community.jpg"
            alt="Hands reaching together in community"
            className="absolute inset-0 w-full h-full object-cover opacity-15"
          />
          <Reveal className="relative max-w-3xl mx-auto px-6 text-center">
            <div className="text-accent text-xs uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
              <div className="w-6 h-px bg-accent" /> New Here? <div className="w-6 h-px bg-accent" />
            </div>
            <h2
              className="text-white mb-4 tracking-tight"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.25rem, 4vw, 3rem)", fontWeight: 600 }}
            >
              You Are Welcome Here
            </h2>
            <p className="text-white/70 mb-8 text-lg">
              Whether this is your first Sunday or you've been searching for a church home — we'd love to meet you. Let us know you're coming.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate("visitor")}
                className="px-8 py-3 bg-pop text-white hover:bg-pop/90 rounded transition-colors shadow-lg shadow-pop/20"
              >
                Register as a Guest
              </motion.button>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate("about")}
                className="px-8 py-3 border border-white/30 text-white hover:bg-white/10 rounded transition-colors"
              >
                Learn About Us
              </motion.button>
            </div>
          </Reveal>
        </section>

        {/* Footer */}
        <footer className="bg-foreground text-white/70">
          <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
            <div>
              <div
                className="text-white mb-2"
                style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 600 }}
              >
                Evangelical Community Church
              </div>
              <p className="text-sm leading-relaxed">
                National Highway, Poblacion Ward II<br />
                Minglanilla, Cebu, Philippines 6046
              </p>
              <p className="text-sm mt-3">
                +63 2 8234 5678<br />
                info@ecc.org.ph
              </p>
            </div>
            <div>
              <div className="text-white text-sm uppercase tracking-wider mb-3">Quick Links</div>
              <div className="space-y-2 text-sm">
                {["About", "Services", "Events", "Sermons", "Give"].map((l) => (
                  <button key={l} onClick={() => onNavigate(l.toLowerCase())} className="block hover:text-accent transition-colors">
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-white text-sm uppercase tracking-wider mb-3">Get Involved</div>
              <div className="space-y-2 text-sm">
                {["Plan Your Visit", "Prayer Request", "Volunteer", "Contact Us"].map((l) => (
                  <div key={l} className="hover:text-accent transition-colors cursor-pointer">{l}</div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-white text-sm uppercase tracking-wider mb-3">Service Times</div>
              <div className="space-y-2 text-sm">
                <div>Sunday: 9:00 AM & 11:00 AM</div>
                <div>Wednesday: 6:30 PM</div>
                <div>Friday: 6:00 PM</div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 py-4">
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-center text-xs text-white/40">
              <span>© 2026 Evangelical Community Church. All rights reserved.</span>
            </div>
          </div>
        </footer>

        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </MotionConfig>
  );
}
