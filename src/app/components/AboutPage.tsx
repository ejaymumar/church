import {
  Heart, Target, Eye, Users, Award, ShieldCheck, Sprout,
  Sunrise, Church, GraduationCap, HandCoins, Megaphone,
  Briefcase, Music, BookOpen, Hand, HeartHandshake, Clock,
} from "lucide-react";
import { motion, MotionConfig } from "motion/react";
import { Reveal, staggerContainer, staggerItem } from "./motion/Reveal";

const leadership = [
  {
    name: "Pastor Daniel Santos",
    role: "Senior Pastor",
    bio: "Pastor Daniel has led Evangelical Community Church since 2008. He holds a Masters in Theology from Asia Pacific Theological Seminary and is passionate about discipleship and community transformation.",
    photo: "/images/team-1.jpg",
  },
  {
    name: "Mrs. Ruth Santos",
    role: "Women's Ministry Leader",
    bio: "Ruth oversees the Women's Ministry and counselling services. She is a certified life coach and has a heart for healing and restoration.",
    photo: "/images/team-2.jpg",
  },
  {
    name: "Elder Joseph Reyes",
    role: "Elder & Administration",
    bio: "Elder Joseph has served the church for over 15 years. He leads the administration and finance teams and is the primary point of contact for church operations.",
    photo: "/images/team-3.jpg",
  },
  {
    name: "Sarah Garcia",
    role: "Youth & Young Adults Pastor",
    bio: "Sarah leads the vibrant youth ministry and young adults community. She is a gifted communicator with a passion for the next generation.",
    photo: "/images/team-4.jpg",
  },
];

const coreValues = [
  { label: "Teamwork", desc: "We are a family — we do life together and bear one another's burdens.", icon: Users },
  { label: "Excellence", desc: "We honour God by bringing our best to everything we do.", icon: Award },
  { label: "Accountability", desc: "We are accountable to one another and to God.", icon: ShieldCheck },
  { label: "Multiplication", desc: "We are committed to reproducing the work of Christ in our community and beyond.", icon: Sprout },
];

const growthPath = [
  { title: "Appointment with God", cadence: "Daily", icon: Sunrise },
  { title: "Celebration with God's People", cadence: "Weekly", icon: Church },
  { title: "Discipleship Group", cadence: "Weekly", icon: GraduationCap },
  { title: "Contribution to Ministry", cadence: "Payday", icon: HandCoins },
  { title: "Gospel Sharing", cadence: "Every Opportunity", icon: Megaphone },
];

const pillarMinistries = [
  { name: "Admin & Finance", icon: Briefcase },
  { name: "Worship", icon: Music },
  { name: "Discipleship", icon: BookOpen },
  { name: "Prayer", icon: Hand },
  { name: "Outreach", icon: HeartHandshake },
];

const discipleshipGroups = [
  { name: "DOTA", schedule: "Sun · 1:00 PM", leader: "Bro. Christian Inso" },
  { name: "CAREer", schedule: "Sun · 1:00 PM", leader: "Bro. Jordan Fajardo" },
  { name: "Elevate", schedule: "Sun · 1:00 PM", leader: "Bro. Jordan Fajardo" },
  { name: "Charity", schedule: "Sun · 1:30 PM", leader: "Sis. Beth Sevillano" },
];

export function AboutPage() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen">
        {/* Hero */}
        <section className="relative mesh-navy grain cross-pattern py-24 overflow-hidden">
          <img
            src="/images/about-hero.jpg"
            alt="Church interior"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/70 to-primary/30" />
          <Reveal className="relative max-w-4xl mx-auto px-6 text-center">
            <div className="text-accent text-xs uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
              <div className="w-6 h-px bg-accent" /> Our Story <div className="w-6 h-px bg-accent" />
            </div>
            <h1
              className="text-white mb-6 tracking-tight"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 600, lineHeight: 1.1 }}
            >
              Who We Are
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              Founded in 1998 in the heart of Minglanilla, Cebu, Evangelical Community Church has grown from a small prayer group of 12 into a thriving congregation of over 300 members.
            </p>
          </Reveal>
        </section>

        {/* Mission / Vision / Values */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <Reveal>
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="bg-primary text-white rounded-lg p-8 hover:shadow-lg transition-shadow"
              >
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mb-5">
                  <Target className="w-5 h-5 text-accent" />
                </div>
                <div className="text-accent text-xs uppercase tracking-widest mb-3">Mission</div>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", lineHeight: 1.6 }}>
                  To make disciples who Live the Word, Give towards the Work and Influence the World for Christ.
                </p>
              </motion.div>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="bg-accent text-white rounded-lg p-8 hover:shadow-lg transition-shadow"
              >
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-5">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <div className="text-white/70 text-xs uppercase tracking-widest mb-3">Vision</div>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", lineHeight: 1.6 }}>
                  Towards a reproducing church that models intentional disciple-making.
                </p>
              </motion.div>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="bg-secondary rounded-lg p-8 border border-border hover:shadow-lg hover:border-accent/40 transition-shadow"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <div className="text-accent text-xs uppercase tracking-widest mb-3">Our Heart</div>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", lineHeight: 1.6, color: "var(--foreground)" }}>
                  We believe every person matters. Whoever you are, wherever you've been — there is a place for you at Evangelical Community Church.
                </p>
              </motion.div>
            </div>
          </Reveal>

          {/* Core Values */}
          <Reveal>
            <div className="mb-4">
              <div className="text-accent text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                <div className="w-6 h-px bg-accent" /> Core Values
              </div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.25rem", fontWeight: 600 }} className="tracking-tight mb-8">
                What We Believe & How We Live
              </h2>
            </div>
          </Reveal>
          <div className="max-w-3xl space-y-4">
            {coreValues.map((v, i) => {
              const Icon = v.icon;
              return (
                <Reveal key={i} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="flex items-start gap-5 bg-card border border-border rounded-lg p-5 hover:shadow-lg hover:border-accent/40 transition-shadow"
                  >
                    <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 600 }} className="mb-1">
                        <span className="text-accent" style={{ fontSize: "1.5rem", fontWeight: 700 }}>{v.label.charAt(0)}</span>{v.label.slice(1)}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Growth Path */}
        <section className="bg-secondary py-20">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal>
              <div className="text-accent text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                <div className="w-6 h-px bg-accent" /> Growth Path
              </div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.25rem", fontWeight: 600 }} className="tracking-tight mb-8">
                Our Rhythm of Discipleship
              </h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {growthPath.map((g, i) => {
                const Icon = g.icon;
                return (
                  <Reveal key={i} delay={i * 0.08}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 22 }}
                      className="bg-card border border-border rounded-lg p-5 text-center hover:shadow-lg hover:border-accent/40 transition-shadow h-full"
                    >
                      <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 600 }} className="mb-3 leading-snug">
                        {g.title}
                      </h3>
                      <span className="inline-block text-xs uppercase tracking-wider text-accent bg-accent/10 rounded-full px-3 py-1">
                        {g.cadence}
                      </span>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pillar Ministries */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <Reveal>
            <div className="text-accent text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
              <div className="w-6 h-px bg-accent" /> Pillar Ministries
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.25rem", fontWeight: 600 }} className="tracking-tight mb-8">
              Five Pillars That Hold Us Up
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {pillarMinistries.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={i} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="bg-primary text-white rounded-lg p-6 flex flex-col items-center text-center gap-3 hover:shadow-lg transition-shadow h-full"
                  >
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 600 }}>
                      {p.name}
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Discipleship Groups */}
        <section className="max-w-4xl mx-auto px-6 pb-20">
          <Reveal>
            <div className="text-accent text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
              <div className="w-6 h-px bg-accent" /> Discipleship Groups
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.25rem", fontWeight: 600 }} className="tracking-tight mb-8">
              Find Your Group
            </h2>
          </Reveal>
          <Reveal>
            <div className="divide-y divide-border border border-border rounded-lg overflow-hidden">
              {discipleshipGroups.map((d, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="flex items-center gap-4 px-5 py-4 bg-card hover:bg-secondary/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 600 }}>
                      {d.name}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">Led by {d.leader}</div>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-accent flex-shrink-0">
                    <Clock className="w-3.5 h-3.5" />
                    {d.schedule}
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Church History */}
        <section className="bg-secondary py-20">
          <div className="max-w-4xl mx-auto px-6">
            <Reveal>
              <div className="text-accent text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                <div className="w-6 h-px bg-accent" /> Our History
              </div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.25rem", fontWeight: 600 }} className="tracking-tight mb-8">
                28 Years of Grace
              </h2>
            </Reveal>
            <div className="space-y-6">
              {[
                { year: "1998", event: "Founded by 12 founding members in a home in Minglanilla, Cebu." },
                { year: "2003", event: "Moved into our first dedicated building in Poblacion, Minglanilla." },
                { year: "2008", event: "Pastor Daniel Santos appointed as Senior Pastor." },
                { year: "2012", event: "Launch of the Youth Ministry under Pastor Sarah Garcia." },
                { year: "2018", event: "Building fund drive for the current Main Sanctuary on the National Highway, Minglanilla." },
                { year: "2022", event: "Opened the Outreach Centre and Community Kitchen in Inayagan, Minglanilla." },
                { year: "2026", event: "Digital transformation — launching our new church website and member portal." },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="flex gap-5">
                    <div className="flex-shrink-0 w-14 text-right">
                      <span className="text-accent font-medium text-sm">{item.year}</span>
                    </div>
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-accent mt-1.5" />
                      {i < 6 && <div className="w-px flex-1 bg-border mt-1" />}
                    </div>
                    <p className="text-sm text-muted-foreground pb-4">{item.event}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <Reveal>
            <div className="text-accent text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
              <div className="w-6 h-px bg-accent" /> Leadership
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.25rem", fontWeight: 600 }} className="tracking-tight mb-10">
              Meet the Team
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((person, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg hover:border-accent/40 transition-shadow group h-full"
                >
                  <div className="relative arch-sm overflow-hidden h-48">
                    <img
                      src={person.photo}
                      alt={person.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 600 }} className="mb-0.5">
                      {person.name}
                    </h3>
                    <div className="text-accent text-xs uppercase tracking-wide mb-3">{person.role}</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{person.bio}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </MotionConfig>
  );
}
