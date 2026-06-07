import { Calendar, MapPin, Clock, BookOpen, ChevronRight } from "lucide-react";

interface EventsPageProps {
  onNavigate: (page: string) => void;
}

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
  },
  {
    date: "12–14 Jul 2026",
    title: "Youth Camp 2026",
    theme: "Rooted & Built Up",
    verse: "Colossians 2:7",
    location: "Camp Canaan, Tagaytay",
    time: "Depart 7:00 AM",
    leader: "Pastor Sarah Garcia",
    description: "Annual youth camp for teens aged 13–25. Three days of worship, teaching, outdoor activities, and community building.",
    status: "Registration Open",
    capacity: "80 spots",
  },
  {
    date: "19 Jul 2026",
    title: "Community Outreach",
    theme: "Love in Action",
    verse: "James 2:17",
    location: "Payatas, Quezon City",
    time: "8:00 AM – 1:00 PM",
    leader: "Elder Joseph Reyes",
    description: "Monthly outreach to Payatas. Volunteers serve at the food kitchen, conduct door-to-door prayer walks, and distribute care packs.",
    status: "Open to All",
    capacity: "Unlimited",
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
  },
];

export function EventsPage({ onNavigate }: EventsPageProps) {
  return (
    <div className="min-h-screen">
      <section className="bg-primary py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-accent text-xs uppercase tracking-widest mb-3">Events & Activities</div>
          <h1 className="text-white" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 600 }}>
            Upcoming Events
          </h1>
          <p className="text-white/60 mt-3">Join us as we grow together — in faith, in fellowship, and in service to our community.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-6">
          {events.map((e, i) => (
            <div key={i} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row">
                <div className="bg-primary md:w-40 flex-shrink-0 px-6 py-6 flex flex-col justify-center text-center">
                  <div className="text-accent text-xs uppercase tracking-widest mb-1">Event</div>
                  <div className="text-white text-sm font-medium leading-snug">{e.date}</div>
                  <div className="mt-3 text-xs text-white/50">{e.time}</div>
                </div>
                <div className="flex-1 p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 600 }}>
                        {e.title}
                      </h3>
                      <div className="text-accent text-sm italic mt-0.5">"{e.theme}"</div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      e.status === "Registration Open" ? "bg-accent/10 text-accent" :
                      e.status === "Open to All" ? "bg-green-100 text-green-700" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {e.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{e.description}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{e.location}</span>
                    <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{e.verse}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Leader: {e.leader}</span>
                  </div>
                  {e.status !== "Coming Soon" && (
                    <button className="px-5 py-2 text-sm bg-primary text-white hover:bg-primary/90 rounded transition-colors flex items-center gap-1.5">
                      Register Now <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
