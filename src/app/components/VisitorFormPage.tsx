import { useState } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle, Cross } from "lucide-react";

interface VisitorFormData {
  full_name: string;
  date_of_birth: string;
  phone_number: string;
  email_address: string;
  home_area: string;
  heard_via: string;
  visit_date: string;
  visit_type: "First Time" | "Returning";
  wants_contact: boolean;
}

export function VisitorFormPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Earliest selectable visit date — today (local) onwards
  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VisitorFormData>();

  const onSubmit = async (data: VisitorFormData) => {
    setSubmitting(true);
    // Simulate webhook POST
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Visitor form submitted:", {
      ...data,
      visited_on: new Date().toISOString().split("T")[0],
    });
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-accent" />
          </div>
          <h1
            style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 600 }}
            className="mb-3"
          >
            Welcome to ECC!
          </h1>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Thank you for registering with us. Our team will be in touch soon — we're so glad you're here.
          </p>
          <div className="bg-secondary border border-border rounded-lg p-5 text-sm text-left space-y-2 mb-6">
            <div className="text-accent text-xs uppercase tracking-widest mb-3">Next Steps</div>
            <div className="flex items-start gap-2 text-muted-foreground">
              <span className="text-accent mt-0.5">→</span> Pick up a welcome pack from our Info Desk
            </div>
            <div className="flex items-start gap-2 text-muted-foreground">
              <span className="text-accent mt-0.5">→</span> Join us for coffee after the service in the foyer
            </div>
            <div className="flex items-start gap-2 text-muted-foreground">
              <span className="text-accent mt-0.5">→</span> Visit our "New Here?" table to learn about our ministries
            </div>
          </div>
          <button
            onClick={() => setSubmitted(false)}
            className="text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            Submit another response
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary py-12">
        <div className="max-w-lg mx-auto px-6 text-center">
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
            <Cross className="w-5 h-5 text-accent" />
          </div>
          <h1
            className="text-white mb-2"
            style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 600 }}
          >
            Welcome to Evangelical Community Church
          </h1>
          <p className="text-white/60 text-sm">
            We're so glad you're here. Please take a moment to register — it helps us get to know you.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-lg mx-auto px-6 py-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Full Name <span className="text-accent">*</span>
            </label>
            <input
              {...register("full_name", { required: "Full name is required" })}
              type="text"
              placeholder="Jane Dlamini"
              className={`w-full px-4 py-2.5 rounded bg-input-background border text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all ${
                errors.full_name ? "border-destructive" : "border-border"
              }`}
            />
            {errors.full_name && (
              <p className="text-xs text-destructive mt-1">{errors.full_name.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Phone Number <span className="text-accent">*</span>
            </label>
            <input
              {...register("phone_number", { required: "Phone number is required" })}
              type="tel"
              placeholder="+63 917 234 5678"
              className={`w-full px-4 py-2.5 rounded bg-input-background border text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all ${
                errors.phone_number ? "border-destructive" : "border-border"
              }`}
            />
            {errors.phone_number && (
              <p className="text-xs text-destructive mt-1">{errors.phone_number.message}</p>
            )}
          </div>

          {/* Date of Visit */}
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Date of Visit <span className="text-accent">*</span>
            </label>
            <input
              {...register("visit_date", { required: "Please choose a date for your visit" })}
              type="date"
              min={today}
              className={`w-full px-4 py-2.5 rounded bg-input-background border text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all ${
                errors.visit_date ? "border-destructive" : "border-border"
              }`}
            />
            {errors.visit_date && (
              <p className="text-xs text-destructive mt-1">{errors.visit_date.message}</p>
            )}
          </div>

          {/* Visit type */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Are you a first-time or returning visitor? <span className="text-accent">*</span>
            </label>
            <div className="flex gap-4">
              {(["First Time", "Returning"] as const).map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    {...register("visit_type", { required: true })}
                    type="radio"
                    value={type}
                    className="accent-[var(--accent)]"
                  />
                  <span className="text-sm group-hover:text-accent transition-colors">{type}</span>
                </label>
              ))}
            </div>
            {errors.visit_type && (
              <p className="text-xs text-destructive mt-1">Please select an option</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1.5">Email Address</label>
            <input
              {...register("email_address")}
              type="email"
              placeholder="jane@example.com"
              className="w-full px-4 py-2.5 rounded bg-input-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium mb-1.5">Date of Birth</label>
            <input
              {...register("date_of_birth")}
              type="date"
              className="w-full px-4 py-2.5 rounded bg-input-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all"
            />
          </div>

          {/* Home Area */}
          <div>
            <label className="block text-sm font-medium mb-1.5">Home Area / Suburb</label>
            <input
              {...register("home_area")}
              type="text"
              placeholder="e.g. Minglanilla, Talisay, Cebu City"
              className="w-full px-4 py-2.5 rounded bg-input-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all"
            />
          </div>

          {/* How did you hear */}
          <div>
            <label className="block text-sm font-medium mb-1.5">How did you hear about us?</label>
            <select
              {...register("heard_via")}
              className="w-full px-4 py-2.5 rounded bg-input-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all appearance-none"
            >
              <option value="">Select an option</option>
              <option value="Social Media">Social Media</option>
              <option value="Friend/Family">Friend / Family</option>
              <option value="Driving Past">Driving Past</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Would you like to be contacted */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                {...register("wants_contact")}
                type="checkbox"
                className="mt-0.5 w-4 h-4 accent-[var(--accent)]"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                I would like someone from Evangelical Community Church to contact me
              </span>
            </label>
          </div>

          {/* Privacy notice */}
          <div className="bg-secondary/60 border border-border rounded-lg px-4 py-3 text-xs text-muted-foreground leading-relaxed">
            Your information is kept strictly confidential and used only for church follow-up purposes. We comply with the Data Privacy Act of 2012 (RA 10173). You may request deletion at any time by contacting admin@ecc.org.ph.
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-accent text-white hover:bg-accent/90 rounded transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm font-medium"
          >
            {submitting ? "Submitting…" : "Submit Registration"}
          </button>
        </form>
      </div>
    </div>
  );
}
