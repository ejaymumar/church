import { Heart, Target, Eye } from "lucide-react";

const leadership = [
  {
    name: "Pastor Daniel Santos",
    role: "Senior Pastor",
    bio: "Pastor Daniel has led Evangelical Community Church since 2008. He holds a Masters in Theology from Asia Pacific Theological Seminary and is passionate about discipleship and community transformation.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&auto=format",
  },
  {
    name: "Mrs. Ruth Santos",
    role: "Women's Ministry Leader",
    bio: "Ruth oversees the Women's Ministry and counselling services. She is a certified life coach and has a heart for healing and restoration.",
    photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&h=300&fit=crop&auto=format",
  },
  {
    name: "Elder Joseph Reyes",
    role: "Elder & Administration",
    bio: "Elder Joseph has served the church for over 15 years. He leads the administration and finance teams and is the primary point of contact for church operations.",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&auto=format",
  },
  {
    name: "Sarah Garcia",
    role: "Youth & Young Adults Pastor",
    bio: "Sarah leads the vibrant youth ministry and young adults community. She is a gifted communicator with a passion for the next generation.",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&auto=format",
  },
];

const coreValues = [
  { label: "Word-centred", desc: "Everything we do is anchored in the truth of Scripture." },
  { label: "Spirit-filled", desc: "We believe in the active work of the Holy Spirit in the life of every believer." },
  { label: "Community-focused", desc: "We are a family — we do life together and bear one another's burdens." },
  { label: "Outreach-driven", desc: "We are called to serve our city and the nations with the love of Christ." },
  { label: "Discipleship", desc: "We are committed to helping every member grow into the fullness of Christ." },
  { label: "Excellence", desc: "We honour God by bringing our best to everything we do." },
];

export function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-primary py-24 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1699830506478-af7b3f5e6cc9?w=1400&h=500&fit=crop&auto=format"
          alt="Church interior"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="text-accent text-xs uppercase tracking-widest mb-4">Our Story</div>
          <h1
            className="text-white mb-6"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 600, lineHeight: 1.1 }}
          >
            Who We Are
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Founded in 1998 in the heart of Quezon City, Evangelical Community Church has grown from a small prayer group of 12 into a thriving congregation of over 300 members.
          </p>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-primary text-white rounded-lg p-8">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mb-5">
              <Target className="w-5 h-5 text-accent" />
            </div>
            <div className="text-accent text-xs uppercase tracking-widest mb-3">Mission</div>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", lineHeight: 1.6 }}>
              To make disciples of all nations — transforming lives through the Word of God, authentic community, and Spirit-led worship.
            </p>
          </div>
          <div className="bg-accent text-white rounded-lg p-8">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-5">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div className="text-white/70 text-xs uppercase tracking-widest mb-3">Vision</div>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", lineHeight: 1.6 }}>
              A church that is a light in Metro Manila — where every person is known, loved, and equipped to live out their God-given purpose.
            </p>
          </div>
          <div className="bg-secondary rounded-lg p-8 border border-border">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-5">
              <Heart className="w-5 h-5 text-primary" />
            </div>
            <div className="text-accent text-xs uppercase tracking-widest mb-3">Our Heart</div>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", lineHeight: 1.6, color: "var(--foreground)" }}>
              We believe every person matters. Whoever you are, wherever you've been — there is a place for you at Evangelical Community Church.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-4">
          <div className="text-accent text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
            <div className="w-6 h-px bg-accent" /> Core Values
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 600 }} className="mb-8">
            What We Believe & How We Live
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {coreValues.map((v, i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-5 hover:border-accent/30 transition-colors">
              <div className="text-accent text-xs uppercase tracking-wider mb-1 font-medium">0{i + 1}</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 600 }} className="mb-2">
                {v.label}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Church History */}
      <section className="bg-secondary py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-accent text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
            <div className="w-6 h-px bg-accent" /> Our History
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 600 }} className="mb-8">
            28 Years of Grace
          </h2>
          <div className="space-y-6">
            {[
              { year: "1998", event: "Founded by 12 founding members in a home in Quezon City." },
              { year: "2003", event: "Moved into our first dedicated building in Cubao, Quezon City." },
              { year: "2008", event: "Pastor Daniel Santos appointed as Senior Pastor." },
              { year: "2012", event: "Launch of the Youth Ministry under Pastor Sarah Garcia." },
              { year: "2018", event: "Building fund drive for the current Main Sanctuary on Katipunan Avenue." },
              { year: "2022", event: "Opened the Outreach Centre and Community Kitchen in Payatas." },
              { year: "2026", event: "Digital transformation — launching our new church website and member portal." },
            ].map((item, i) => (
              <div key={i} className="flex gap-5">
                <div className="flex-shrink-0 w-14 text-right">
                  <span className="text-accent font-medium text-sm">{item.year}</span>
                </div>
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-accent mt-1.5" />
                  {i < 6 && <div className="w-px flex-1 bg-border mt-1" />}
                </div>
                <p className="text-sm text-muted-foreground pb-4">{item.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-accent text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
          <div className="w-6 h-px bg-accent" /> Leadership
        </div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 600 }} className="mb-10">
          Meet the Team
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leadership.map((person, i) => (
            <div key={i} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow group">
              <div className="h-48 bg-muted overflow-hidden">
                <img
                  src={person.photo}
                  alt={person.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 600 }} className="mb-0.5">
                  {person.name}
                </h3>
                <div className="text-accent text-xs uppercase tracking-wide mb-3">{person.role}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{person.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
