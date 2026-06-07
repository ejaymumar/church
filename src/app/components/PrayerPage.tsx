"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle, BookOpen } from "lucide-react";
import { motion, MotionConfig } from "motion/react";
import { Reveal } from "./motion/Reveal";

interface PrayerFormData {
  name: string;
  request_text: string;
  visibility: "Public" | "Private";
}

const publicPrayers = [
  { name: "Lerato M.", request: "Wisdom and guidance for an important career decision.", date: "2 Jun" },
  { name: "Gift S.", request: "Financial breakthrough — believing God for provision this season.", date: "30 May" },
  { name: "Anonymous", request: "Thank God for healing received last week. Praising Him!", date: "28 May" },
  { name: "Thabo D.", request: "Pray for my family — we're going through a difficult transition.", date: "26 May" },
];

export function PrayerPage() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<PrayerFormData>({
    defaultValues: { visibility: "Private" }
  });

  const onSubmit = async () => {
    await new Promise(r => setTimeout(r, 800));
    setSubmitted(true);
  };

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen">
      <section className="relative overflow-hidden mesh-navy grain cross-pattern py-16">
        <Reveal className="relative max-w-2xl mx-auto px-6 text-center">
          <div className="text-accent text-xs uppercase tracking-widest mb-3">Prayer</div>
          <h1 className="text-white" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600 }}>
            We Are Praying With You
          </h1>
          <p className="text-white/60 mt-3">"Do not be anxious about anything, but in every situation, by prayer and petition, present your requests to God." — Philippians 4:6</p>
        </Reveal>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-12">
        {/* Submit form */}
        <Reveal>
          <div className="text-accent text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
            <div className="w-5 h-px bg-accent" /> Submit a Request
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 600 }} className="mb-6">
            Share Your Prayer Need
          </h2>

          {submitted ? (
            <div className="bg-secondary border border-border rounded-lg p-6 text-center">
              <CheckCircle className="w-8 h-8 text-accent mx-auto mb-3" />
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }} className="mb-2">
                Your Request Has Been Received
              </h3>
              <p className="text-sm text-muted-foreground">Our prayer team will stand in agreement with you. You are not alone.</p>
              <button onClick={() => setSubmitted(false)} className="mt-4 text-sm text-accent hover:underline">
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Your Name (optional)</label>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Or leave blank for anonymous"
                  className="w-full px-4 py-2.5 text-sm bg-input-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Prayer Request <span className="text-accent">*</span>
                </label>
                <textarea
                  {...register("request_text", { required: "Please share your prayer request." })}
                  rows={5}
                  placeholder="Share what's on your heart…"
                  className={`w-full px-4 py-2.5 text-sm bg-input-background border rounded focus:outline-none focus:ring-2 focus:ring-accent/40 resize-none ${errors.request_text ? "border-destructive" : "border-border"}`}
                />
                {errors.request_text && <p className="text-xs text-destructive mt-1">{errors.request_text.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Visibility</label>
                <div className="flex gap-4">
                  {([{ v: "Private", desc: "Leadership only" }, { v: "Public", desc: "Shared with congregation" }] as const).map(({ v, desc }) => (
                    <label key={v} className="flex items-start gap-2 cursor-pointer">
                      <input {...register("visibility")} type="radio" value={v} className="mt-0.5 accent-[var(--accent)]" />
                      <div>
                        <div className="text-sm">{v}</div>
                        <div className="text-xs text-muted-foreground">{desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full py-3 bg-pop text-white hover:bg-pop/90 rounded transition-colors text-sm shadow-lg shadow-pop/20"
              >
                Submit Prayer Request
              </motion.button>
            </form>
          )}
        </Reveal>

        {/* Community prayers */}
        <Reveal>
          <div className="text-accent text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
            <div className="w-5 h-px bg-accent" /> Community Wall
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 600 }} className="mb-6">
            Congregation's Prayers
          </h2>
          <div className="space-y-4">
            {publicPrayers.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="bg-card border border-border rounded-lg p-4 hover:shadow-lg hover:border-accent/40 transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">
                      {p.name.charAt(0)}
                    </div>
                    <span className="text-sm font-medium">{p.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{p.date}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.request}</p>
                <button className="mt-2 text-xs text-accent hover:underline flex items-center gap-1">
                  <BookOpen className="w-3 h-3" /> I'm praying for this
                </button>
              </motion.div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
    </MotionConfig>
  );
}
