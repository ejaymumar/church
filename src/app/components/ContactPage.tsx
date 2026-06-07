import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { motion, MotionConfig } from "motion/react";
import { Reveal } from "./motion/Reveal";

const departments = [
  { name: "General Enquiries", contact: "info@ecc.org.ph", person: "Admin Office" },
  { name: "Pastoral Care", contact: "pastoral@ecc.org.ph", person: "Pastor Daniel Santos" },
  { name: "Media & Sermons", contact: "media@ecc.org.ph", person: "Media Team" },
  { name: "Youth Ministry", contact: "youth@ecc.org.ph", person: "Pastor Sarah Garcia" },
  { name: "Women's Ministry", contact: "women@ecc.org.ph", person: "Mrs. Ruth Santos" },
];

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async () => {
    await new Promise(r => setTimeout(r, 800));
    setSubmitted(true);
  };

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen">
      <section className="relative overflow-hidden mesh-navy grain cross-pattern py-16">
        <Reveal className="relative max-w-2xl mx-auto px-6 text-center">
          <div className="text-accent text-xs uppercase tracking-widest mb-3">Get in Touch</div>
          <h1 className="text-white" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600 }}>
            Contact Us
          </h1>
          <p className="text-white/60 mt-3">We'd love to hear from you. Reach out and we'll get back to you within 24 hours.</p>
        </Reveal>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-10">
        {/* Contact info */}
        <Reveal className="space-y-6">
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="bg-card border border-border rounded-lg p-5 hover:shadow-lg hover:border-accent/40 transition-shadow"
          >
            <div className="text-accent text-xs uppercase tracking-widest mb-4">Location</div>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
              <div className="text-sm text-muted-foreground leading-relaxed">
                National Highway, Poblacion Ward II<br />
                Minglanilla, Cebu<br />
                Philippines 6046
              </div>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="bg-card border border-border rounded-lg p-5 space-y-3 hover:shadow-lg hover:border-accent/40 transition-shadow"
          >
            <div className="text-accent text-xs uppercase tracking-widest mb-1">Contact Details</div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Phone className="w-4 h-4 text-accent flex-shrink-0" />
              +63 32 273 4567
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Mail className="w-4 h-4 text-accent flex-shrink-0" />
              info@ecc.org.ph
            </div>
          </motion.div>
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="bg-card border border-border rounded-lg p-5 hover:shadow-lg hover:border-accent/40 transition-shadow"
          >
            <div className="text-accent text-xs uppercase tracking-widest mb-3">Office Hours</div>
            <div className="space-y-1.5 text-sm text-muted-foreground">
              <div className="flex justify-between"><span>Monday – Friday</span><span>9:00 AM – 4:00 PM</span></div>
              <div className="flex justify-between"><span>Saturday</span><span>Closed</span></div>
              <div className="flex justify-between"><span>Sunday</span><span>8:00 AM – 1:00 PM</span></div>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="bg-card border border-border rounded-lg p-5 hover:shadow-lg hover:border-accent/40 transition-shadow"
          >
            <div className="text-accent text-xs uppercase tracking-widest mb-3">Follow Us</div>
            <div className="flex gap-3">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Instagram, label: "Instagram" },
                { icon: Youtube, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <button key={label} className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors" title={label}>
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </motion.div>
        </Reveal>

        {/* Enquiry form */}
        <Reveal className="lg:col-span-2">
          <div className="text-accent text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
            <div className="w-5 h-px bg-accent" /> Send a Message
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 600 }} className="mb-6">
            General Enquiry
          </h2>

          {submitted ? (
            <div className="bg-secondary border border-border rounded-lg p-8 text-center">
              <CheckCircle className="w-8 h-8 text-accent mx-auto mb-3" />
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>Message Sent!</h3>
              <p className="text-sm text-muted-foreground mt-2">We'll get back to you within 24 hours.</p>
              <button onClick={() => setSubmitted(false)} className="mt-4 text-sm text-accent hover:underline">Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Full Name <span className="text-accent">*</span></label>
                  <input {...register("name", { required: true })} type="text" placeholder="Jane Dlamini" className={`w-full px-4 py-2.5 text-sm bg-input-background border rounded focus:outline-none focus:ring-2 focus:ring-accent/40 ${errors.name ? "border-destructive" : "border-border"}`} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Email <span className="text-accent">*</span></label>
                  <input {...register("email", { required: true })} type="email" placeholder="jane@example.com" className={`w-full px-4 py-2.5 text-sm bg-input-background border rounded focus:outline-none focus:ring-2 focus:ring-accent/40 ${errors.email ? "border-destructive" : "border-border"}`} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Department</label>
                <select {...register("department")} className="w-full px-4 py-2.5 text-sm bg-input-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent/40">
                  {departments.map(d => <option key={d.name} value={d.name}>{d.name} — {d.person}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Message <span className="text-accent">*</span></label>
                <textarea {...register("message", { required: true })} rows={5} placeholder="How can we help you?" className={`w-full px-4 py-2.5 text-sm bg-input-background border rounded focus:outline-none focus:ring-2 focus:ring-accent/40 resize-none ${errors.message ? "border-destructive" : "border-border"}`} />
              </div>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="px-8 py-3 bg-pop text-white hover:bg-pop/90 rounded transition-colors text-sm shadow-lg shadow-pop/20"
              >
                Send Message
              </motion.button>
            </form>
          )}

          {/* Department directory */}
          <div className="mt-10">
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 600 }} className="mb-4">
              Department Directory
            </h3>
            <div className="divide-y divide-border border border-border rounded-lg overflow-hidden">
              {departments.map((d, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-3 bg-card hover:bg-secondary/30 transition-colors text-sm">
                  <div>
                    <div className="font-medium">{d.name}</div>
                    <div className="text-xs text-muted-foreground">{d.person}</div>
                  </div>
                  <a href={`mailto:${d.contact}`} className="text-accent text-xs hover:underline">{d.contact}</a>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Map — Minglanilla, Cebu */}
      <div className="h-64 border-t border-border">
        <iframe
          title="Evangelical Community Church — Minglanilla, Cebu"
          src="https://www.google.com/maps?q=Minglanilla,Cebu,Philippines&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </div>
    </MotionConfig>
  );
}
