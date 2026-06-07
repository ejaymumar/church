"use client";

import { useState } from "react";
import { Heart, Shield, RefreshCw, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { motion, MotionConfig } from "motion/react";
import { Reveal } from "./motion/Reveal";

interface GivingFormData {
  giving_type: string;
  amount: string;
  frequency: "once" | "monthly";
  name: string;
  email: string;
}

export function GivingPage() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<GivingFormData>({
    defaultValues: { giving_type: "Tithe", frequency: "once" }
  });

  const quickAmounts = ["₱ 100", "₱ 250", "₱ 500", "₱ 1,000", "₱ 2,500"];
  const [customAmount, setCustomAmount] = useState("");

  const onSubmit = async (data: GivingFormData) => {
    await new Promise(r => setTimeout(r, 1000));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex items-center justify-center px-6">
        <Reveal className="max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-accent" />
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 600 }} className="mb-3">
            Thank You for Your Gift
          </h1>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." — 2 Corinthians 9:7
          </p>
          <p className="text-sm text-muted-foreground">A receipt has been sent to your email address.</p>
          <button onClick={() => setSubmitted(false)} className="mt-4 text-sm text-accent hover:underline">
            Make another donation
          </button>
        </Reveal>
      </div>
      </MotionConfig>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen">
      <section className="relative overflow-hidden mesh-navy grain cross-pattern py-16">
        <Reveal className="relative max-w-2xl mx-auto px-6 text-center">
          <div className="text-accent text-xs uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
            <Heart className="w-3.5 h-3.5" /> Give Online
          </div>
          <h1 className="text-white" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600 }}>
            Support the Work of God
          </h1>
          <p className="text-white/60 mt-3 max-w-md mx-auto">
            Your generosity makes it possible for us to worship, serve, and reach our community. Every gift matters.
          </p>
        </Reveal>
      </section>

      <section className="max-w-lg mx-auto px-6 py-12">
        <Reveal>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Giving type */}
          <div>
            <label className="block text-sm font-medium mb-2">Giving Category</label>
            <div className="grid grid-cols-2 gap-2">
              {["Tithe", "Offering", "Building Fund", "Missions"].map((type) => (
                <label key={type} className="relative cursor-pointer">
                  <input {...register("giving_type")} type="radio" value={type} className="sr-only peer" />
                  <div className="px-4 py-2.5 text-sm text-center border border-border rounded peer-checked:border-accent peer-checked:bg-accent/5 peer-checked:text-accent hover:border-accent/50 transition-colors">
                    {type}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Frequency */}
          <div>
            <label className="block text-sm font-medium mb-2">Frequency</label>
            <div className="flex gap-3">
              {[{ value: "once", label: "One-time" }, { value: "monthly", label: "Monthly Recurring" }].map(({ value, label }) => (
                <label key={value} className="relative flex-1 cursor-pointer">
                  <input {...register("frequency")} type="radio" value={value} className="sr-only peer" />
                  <div className="px-4 py-2.5 text-sm text-center border border-border rounded peer-checked:border-accent peer-checked:bg-accent/5 peer-checked:text-accent hover:border-accent/50 transition-colors flex items-center justify-center gap-2">
                    {value === "monthly" && <RefreshCw className="w-3.5 h-3.5" />}
                    {label}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium mb-2">Amount (PHP)</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {quickAmounts.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setCustomAmount(a.replace("₱ ", ""))}
                  className={`px-4 py-1.5 text-sm border rounded transition-colors ${
                    customAmount === a.replace("₱ ", "")
                      ? "border-accent bg-accent/5 text-accent"
                      : "border-border hover:border-accent/50"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₱</span>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="Enter amount"
                min="1"
                className="w-full pl-8 pr-4 py-2.5 text-sm bg-input-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>
          </div>

          {/* Name & Email */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Full Name</label>
              <input
                {...register("name", { required: "Required" })}
                type="text"
                placeholder="Jane Dlamini"
                className={`w-full px-4 py-2.5 text-sm bg-input-background border rounded focus:outline-none focus:ring-2 focus:ring-accent/40 ${errors.name ? "border-destructive" : "border-border"}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Email Address</label>
              <input
                {...register("email", { required: "Required" })}
                type="email"
                placeholder="jane@example.com"
                className={`w-full px-4 py-2.5 text-sm bg-input-background border rounded focus:outline-none focus:ring-2 focus:ring-accent/40 ${errors.email ? "border-destructive" : "border-border"}`}
              />
            </div>
          </div>

          {/* Security notice */}
          <div className="bg-secondary/50 border border-border rounded-lg px-4 py-3 flex items-start gap-3 text-xs text-muted-foreground">
            <Shield className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
            <div>
              Payments are processed securely via PayMongo / GCash. Evangelical Community Church does not store your card details. A receipt will be emailed to you upon completion.
            </div>
          </div>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-3 bg-pop text-white hover:bg-pop/90 rounded transition-colors text-sm font-medium flex items-center justify-center gap-2 shadow-lg shadow-pop/20"
          >
            <Heart className="w-4 h-4" />
            Give {customAmount ? `₱ ${parseInt(customAmount || "0").toLocaleString()}` : "Now"}
          </motion.button>
        </form>
        </Reveal>
      </section>
    </div>
    </MotionConfig>
  );
}
