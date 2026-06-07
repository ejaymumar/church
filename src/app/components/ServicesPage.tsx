import { useState } from "react";
import { Clock, MapPin, User, Music, BookOpen, Mic, Calendar } from "lucide-react";
import { motion, MotionConfig } from "motion/react";
import { Reveal } from "./motion/Reveal";

const recurringServices = [
  {
    title: "Sunday Morning Worship",
    day: "Sunday",
    startTime: "9:00 AM",
    endTime: "11:00 AM",
    location: "Main Sanctuary",
    speaker: "Pastor Daniel Santos",
    worshipLeader: "Mark Dela Cruz",
    songLeader: "Grace Bautista",
    closingPrayer: "Elder Joseph Reyes",
    description: "Our primary Sunday gathering — featuring worship, prayer, and a message from the Word of God. Children's church runs concurrently.",
    series: "Names of God",
    currentTopic: "The God Who Sees",
    currentVerse: "Genesis 16:13",
  },
  {
    title: "Family Service",
    day: "Sunday",
    startTime: "11:00 AM",
    endTime: "1:00 PM",
    location: "Main Sanctuary",
    speaker: "Elder Joseph Reyes",
    worshipLeader: "Praise Team",
    songLeader: "Sipho Nkosi",
    closingPrayer: "Deacon Miriam Torres",
    description: "A relaxed, family-friendly service with shorter sermons and more congregational participation. Ideal for families with young children.",
    series: "A Thankful Heart",
    currentTopic: "The Power of Gratitude",
    currentVerse: "Psalm 100:4",
  },
  {
    title: "Wednesday Bible Study & Prayer",
    day: "Wednesday",
    startTime: "6:30 PM",
    endTime: "8:00 PM",
    location: "Fellowship Hall",
    speaker: "Pastor Daniel Santos",
    worshipLeader: "—",
    songLeader: "Congregational",
    closingPrayer: "Elder Joseph Reyes",
    description: "An intimate mid-week gathering focused on deeper Bible study and corporate prayer. Small group format.",
    series: "Walking by Faith",
    currentTopic: "Faith Over Fear",
    currentVerse: "Isaiah 41:10",
  },
  {
    title: "Youth Service",
    day: "Friday",
    startTime: "6:00 PM",
    endTime: "8:00 PM",
    location: "Youth Centre",
    speaker: "Pastor Sarah Garcia",
    worshipLeader: "Youth Worship Band",
    songLeader: "Lena Ramos",
    closingPrayer: "Youth Leader Paolo",
    description: "A high-energy service for teens and young adults. Features contemporary worship, relevant messages, and community activities.",
    series: "Rooted & Built Up",
    currentTopic: "Standing Firm",
    currentVerse: "Colossians 2:6–7",
  },
];

const specialServices = [
  { title: "Good Friday Service", date: "3 Apr 2026", time: "7:00 PM", location: "Main Sanctuary", notes: "Communion service" },
  { title: "Easter Sunday Celebration", date: "5 Apr 2026", time: "6:00 AM & 9:00 AM", location: "Main Sanctuary", notes: "Sunrise service + breakfast" },
  { title: "Pentecost Sunday", date: "24 May 2026", time: "9:00 AM", location: "Main Sanctuary", notes: "Prayer & fasting preceding week" },
  { title: "Christmas Eve Service", date: "24 Dec 2026", time: "6:00 PM", location: "Main Sanctuary", notes: "Candlelight service, all welcome" },
];

export function ServicesPage() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen">
        {/* Hero */}
        <section className="relative mesh-navy grain cross-pattern py-20 overflow-hidden">
          <Reveal className="relative max-w-4xl mx-auto px-6 text-center">
            <div className="text-accent text-xs uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
              <div className="w-6 h-px bg-accent" /> Service Schedule <div className="w-6 h-px bg-accent" />
            </div>
            <h1
              className="text-white tracking-tight"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 600 }}
            >
              Join Us in Worship
            </h1>
            <p className="text-white/60 mt-4 max-w-xl mx-auto">
              We gather weekly to worship, pray, and study the Word. All are welcome — wherever you are on your journey of faith.
            </p>
          </Reveal>
        </section>

        {/* Recurring Services */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <Reveal>
            <div className="text-accent text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
              <div className="w-6 h-px bg-accent" /> Weekly Schedule
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.25rem", fontWeight: 600 }} className="tracking-tight mb-8">
              Regular Services
            </h2>
          </Reveal>

          <div className="space-y-4">
            {recurringServices.map((s, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <motion.div
                  whileHover={selected === i ? undefined : { y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className={`bg-card border rounded-lg overflow-hidden cursor-pointer transition-shadow hover:shadow-lg ${
                    selected === i ? "border-accent shadow-md" : "border-border hover:border-accent/40"
                  }`}
                  onClick={() => setSelected(selected === i ? null : i)}
                >
                  {/* Header row */}
                  <div className="px-6 py-4 flex flex-wrap items-center gap-4 justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                        <span className="text-accent text-xs font-medium">{s.day.slice(0, 3).toUpperCase()}</span>
                      </div>
                      <div>
                        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 600 }}>
                          {s.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mt-0.5">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {s.startTime} – {s.endTime}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {s.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-accent">{s.series}</div>
                      <div className="text-xs text-muted-foreground">{s.currentVerse}</div>
                    </div>
                  </div>

                  {/* Expanded details */}
                  {selected === i && (
                    <div className="border-t border-border px-6 py-5 bg-secondary/40">
                      <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{s.description}</p>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1 flex items-center gap-1">
                            <Mic className="w-3 h-3" /> Speaker
                          </div>
                          <div className="text-sm font-medium">{s.speaker}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1 flex items-center gap-1">
                            <Music className="w-3 h-3" /> Worship Leader
                          </div>
                          <div className="text-sm font-medium">{s.worshipLeader}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1 flex items-center gap-1">
                            <User className="w-3 h-3" /> Song Leader
                          </div>
                          <div className="text-sm font-medium">{s.songLeader}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1 flex items-center gap-1">
                            <BookOpen className="w-3 h-3" /> Closing Prayer
                          </div>
                          <div className="text-sm font-medium">{s.closingPrayer}</div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Current series:</span>
                        <span className="text-accent font-medium">{s.series}</span>
                        <span className="text-muted-foreground">·</span>
                        <span className="italic text-sm">"{s.currentTopic}"</span>
                        <span className="text-muted-foreground">— {s.currentVerse}</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Special Services */}
        <section className="bg-secondary py-16">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal>
              <div className="text-accent text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                <div className="w-6 h-px bg-accent" /> Calendar
              </div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.25rem", fontWeight: 600 }} className="tracking-tight mb-8">
                Special Services 2026
              </h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {specialServices.map((s, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg hover:border-accent/40 transition-shadow h-full"
                  >
                    <div className="bg-primary px-4 py-3 flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-accent" />
                      <span className="text-white text-xs">{s.date}</span>
                    </div>
                    <div className="p-4">
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 600 }} className="mb-1">
                        {s.title}
                      </h3>
                      <div className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                        <Clock className="w-3 h-3" /> {s.time}
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                        <MapPin className="w-3 h-3" /> {s.location}
                      </div>
                      <div className="text-xs text-accent italic">{s.notes}</div>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </div>
    </MotionConfig>
  );
}
