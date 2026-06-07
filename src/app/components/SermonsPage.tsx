import { useState } from "react";
import { Play, Search, Filter, BookOpen, Mic, Calendar } from "lucide-react";

const sermons = [
  { title: "The God Who Sees", speaker: "Pastor Daniel Santos", series: "Names of God", date: "1 Jun 2026", verse: "Genesis 16:13", topic: "Identity & Belonging", duration: "47 min" },
  { title: "Faith Over Fear", speaker: "Pastor Daniel Santos", series: "Walking by Faith", date: "25 May 2026", verse: "Isaiah 41:10", topic: "Trust & Obedience", duration: "52 min" },
  { title: "The Power of Gratitude", speaker: "Elder Maria Reyes", series: "A Thankful Heart", date: "18 May 2026", verse: "Psalm 100:4", topic: "Worship", duration: "38 min" },
  { title: "Standing Firm", speaker: "Pastor Sarah Garcia", series: "Rooted & Built Up", date: "11 May 2026", verse: "Colossians 2:6–7", topic: "Discipleship", duration: "44 min" },
  { title: "The Prodigal Returns", speaker: "Pastor Daniel Santos", series: "Parables of Grace", date: "4 May 2026", verse: "Luke 15:20", topic: "Grace & Forgiveness", duration: "55 min" },
  { title: "Still Small Voice", speaker: "Elder Joseph Reyes", series: "Hearing God", date: "27 Apr 2026", verse: "1 Kings 19:12", topic: "Prayer & Listening", duration: "41 min" },
  { title: "Resurrection Power", speaker: "Pastor Daniel Santos", series: "Easter 2026", date: "5 Apr 2026", verse: "Romans 8:11", topic: "Hope & New Life", duration: "61 min" },
  { title: "Good Friday: The Cross Speaks", speaker: "Pastor Daniel Santos", series: "Easter 2026", date: "3 Apr 2026", verse: "John 19:30", topic: "Salvation", duration: "49 min" },
];

const speakers = ["All Speakers", "Pastor Daniel Santos", "Elder Maria Reyes", "Elder Joseph Reyes"];
const series = ["All Series", "Names of God", "Walking by Faith", "A Thankful Heart", "Rooted & Built Up", "Easter 2026"];

export function SermonsPage() {
  const [search, setSearch] = useState("");
  const [selectedSpeaker, setSelectedSpeaker] = useState("All Speakers");
  const [selectedSeries, setSelectedSeries] = useState("All Series");
  const [playing, setPlaying] = useState<number | null>(null);

  const filtered = sermons.filter((s) => {
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase()) || s.verse.toLowerCase().includes(search.toLowerCase());
    const matchSpeaker = selectedSpeaker === "All Speakers" || s.speaker === selectedSpeaker;
    const matchSeries = selectedSeries === "All Series" || s.series === selectedSeries;
    return matchSearch && matchSpeaker && matchSeries;
  });

  return (
    <div className="min-h-screen">
      <section className="bg-primary py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-accent text-xs uppercase tracking-widest mb-3">Media Library</div>
          <h1 className="text-white" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 600 }}>
            Sermon Archive
          </h1>
          <p className="text-white/60 mt-3">
            Revisit past messages or catch up on what you missed. Available as video and audio.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-10">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search sermons…"
              className="w-full pl-9 pr-4 py-2 text-sm bg-input-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
          </div>
          <select
            value={selectedSpeaker}
            onChange={(e) => setSelectedSpeaker(e.target.value)}
            className="px-3 py-2 text-sm bg-input-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent/40"
          >
            {speakers.map((s) => <option key={s}>{s}</option>)}
          </select>
          <select
            value={selectedSeries}
            onChange={(e) => setSelectedSeries(e.target.value)}
            className="px-3 py-2 text-sm bg-input-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent/40"
          >
            {series.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>

        <div className="space-y-3">
          {filtered.map((s, i) => (
            <div
              key={i}
              className={`bg-card border rounded-lg overflow-hidden transition-all ${playing === i ? "border-accent shadow-md" : "border-border hover:border-accent/40"}`}
            >
              <div className="px-5 py-4 flex items-center gap-4">
                <button
                  onClick={() => setPlaying(playing === i ? null : i)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                    playing === i ? "bg-accent text-white" : "bg-primary/10 text-primary hover:bg-accent/10 hover:text-accent"
                  }`}
                >
                  <Play className="w-4 h-4" fill="currentColor" />
                </button>
                <div className="flex-1 min-w-0">
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 600 }} className="truncate">
                    {s.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mt-0.5">
                    <span className="flex items-center gap-1"><Mic className="w-3 h-3" />{s.speaker}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{s.date}</span>
                    <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{s.verse}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 hidden md:block">
                  <div className="text-xs text-accent">{s.series}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.duration}</div>
                </div>
              </div>
              {playing === i && (
                <div className="px-5 pb-4 bg-secondary/40 border-t border-border">
                  <div className="bg-primary/10 rounded-lg p-4 flex items-center gap-3 mt-3">
                    <div className="text-xs text-muted-foreground">Audio player — video hosted on MinIO or Facebook Live embed would appear here in production.</div>
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    <span className="text-accent font-medium">Topic:</span> {s.topic} · <span className="text-accent font-medium">Series:</span> {s.series}
                  </div>
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">No sermons match your search.</div>
          )}
        </div>
      </section>
    </div>
  );
}
