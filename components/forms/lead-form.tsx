"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { PHONE_NUMBER } from "@/lib/config";

declare global {
  interface Window {
    _turnstileLoaded?: boolean;
    turnstile?: {
      render: (element: HTMLElement, options: Record<string, unknown>) => string;
      execute: (widgetId: string, options?: Record<string, unknown>) => Promise<string>;
      reset: (widgetId: string) => void;
    };
  }
}

function loadTurnstile(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window._turnstileLoaded) return Promise.resolve();

  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]'
    );
    if (existing) {
      window._turnstileLoaded = true;
      return resolve();
    }
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.defer = true;
    s.onload = () => {
      window._turnstileLoaded = true;
      resolve();
    };
    s.onerror = () => {
      console.error("Failed to load Turnstile script");
      reject(new Error("Turnstile script failed to load"));
    };
    document.head.appendChild(s);
  });
}

type FormData = {
  name: string;
  email: string;
  phone: string;
  city: string;
  property: string;
  estimatedCloseDate: string;
  message: string;
};

export function LeadForm() {
  const captchaRef = useRef<HTMLDivElement | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    city: "",
    property: "",
    estimatedCloseDate: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const [turnstileId, setTurnstileId] = useState<string | null>(null);
  const [turnstileReady, setTurnstileReady] = useState(false);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    let cancelled = false;
    const initTimeout = setTimeout(async () => {
      if (cancelled) return;
      if (!siteKey) return;

      try {
        await loadTurnstile();
        if (cancelled) return;

        if (!window.turnstile) {
          console.error("Turnstile API not available");
          return;
        }

        if (!captchaRef.current) {
          console.error("Turnstile ref not mounted");
          return;
        }

        const id: string = window.turnstile.render(captchaRef.current, {
          sitekey: siteKey,
          size: "normal",
          callback: () => {
            setTurnstileReady(true);
          },
          "error-callback": () => {
            console.warn("Turnstile error");
            setTurnstileReady(false);
          },
          "timeout-callback": () => {
            console.warn("Turnstile timeout");
            setTurnstileReady(false);
          },
        });
        setTurnstileId(id);
        setTurnstileReady(true);
      } catch (error) {
        console.error("Failed to initialize Turnstile:", error);
        setTurnstileReady(false);
      }
    }, 500);

    return () => {
      cancelled = true;
      clearTimeout(initTimeout);
    };
  }, [siteKey]);

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = "Required";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Invalid email";
    }
    if (!formData.phone.trim()) newErrors.phone = "Required";
    if (!formData.city.trim()) newErrors.city = "Required";
    if (!formData.property.trim()) newErrors.property = "Required";
    if (!formData.estimatedCloseDate.trim()) newErrors.estimatedCloseDate = "Required";
    if (!formData.message.trim()) newErrors.message = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setFeedback("Please complete all required fields.");
      return;
    }

    setStatus("submitting");
    setErrors({});
    setFeedback("");

    try {
      if (siteKey && (!turnstileReady || !window.turnstile || !turnstileId)) {
        setFeedback("Please complete the security verification.");
        setStatus("error");
        return;
      }

      let turnstileToken = "";
      if (siteKey && window.turnstile && turnstileId) {
        try {
          window.turnstile.reset(turnstileId);
          turnstileToken = await new Promise<string>((resolve, reject) => {
            if (!window.turnstile) {
              reject(new Error("Turnstile not available"));
              return;
            }
            window.turnstile.execute(turnstileId, {
              async: true,
              action: "form_submit",
              callback: (t: string) => resolve(t),
              "error-callback": () => reject(new Error("turnstile-error")),
              "timeout-callback": () => reject(new Error("turnstile-timeout")),
            });
          });
        } catch (err) {
          console.error("Turnstile execution error:", err);
          setFeedback("Security verification failed. Please try again.");
          setStatus("error");
          if (window.turnstile && turnstileId) {
            window.turnstile.reset(turnstileId);
          }
          return;
        }
      }

      const phoneDigits = formData.phone.replace(/\D/g, "");

      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: phoneDigits,
          city: formData.city,
          property: formData.property,
          estimatedCloseDate: formData.estimatedCloseDate,
          message: formData.message,
          projectType: "1031 Exchange",
          "cf-turnstile-response": turnstileToken,
        }),
      });

      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          city: "",
          property: "",
          estimatedCloseDate: "",
          message: "",
        });
        if (window.turnstile && turnstileId) {
          window.turnstile.reset(turnstileId);
        }
        setStatus("success");
        setFeedback("Thank you. A Phoenix exchange specialist will follow up within one business day.");
      } else {
        const errorData = await response.json().catch(() => ({ error: "Failed to submit form" }));
        setFeedback(errorData.error || "Failed to submit form. Please try again.");
        setStatus("error");
        if (window.turnstile && turnstileId) {
          window.turnstile.reset(turnstileId);
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setFeedback("An error occurred. Please try again or contact us directly.");
      setStatus("error");
      if (window.turnstile && turnstileId) {
        window.turnstile.reset(turnstileId);
      }
    }
  };

  return (
    <form
      id="lead-form"
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[#2A2A2A]/10 bg-white p-8 shadow-lg md:p-10"
    >
      <h2 className="mb-6 font-serif text-2xl font-bold text-[#006E7F]">
        Start Your Exchange Plan
      </h2>
      <fieldset disabled={status === "submitting"} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#2A2A2A]">
              Name <span className="text-[#E6A445]">*</span>
            </label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange("name")}
              aria-describedby={errors.name ? "name-error" : "name-helper"}
              aria-invalid={!!errors.name}
              className="w-full rounded-lg border border-[#2A2A2A]/20 bg-white px-4 py-3 text-[#2A2A2A] focus:border-[#006E7F] focus:outline-none focus:ring-2 focus:ring-[#E6A445]"
            />
            {errors.name ? (
              <p id="name-error" className="mt-1 text-sm text-[#E6A445]">
                {errors.name}
              </p>
            ) : (
              <p id="name-helper" className="mt-1 text-xs text-[#2A2A2A]/60">
                Primary investor or advisor name
              </p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#2A2A2A]">
              Email <span className="text-[#E6A445]">*</span>
            </label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange("email")}
              aria-describedby={errors.email ? "email-error" : "email-helper"}
              aria-invalid={!!errors.email}
              className="w-full rounded-lg border border-[#2A2A2A]/20 bg-white px-4 py-3 text-[#2A2A2A] focus:border-[#006E7F] focus:outline-none focus:ring-2 focus:ring-[#E6A445]"
            />
            {errors.email ? (
              <p id="email-error" className="mt-1 text-sm text-[#E6A445]">
                {errors.email}
              </p>
            ) : (
              <p id="email-helper" className="mt-1 text-xs text-[#2A2A2A]/60">
                We send a confirmation and documentation checklist
              </p>
            )}
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-medium text-[#2A2A2A]">
              Phone <span className="text-[#E6A445]">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange("phone")}
              aria-describedby={errors.phone ? "phone-error" : "phone-helper"}
              aria-invalid={!!errors.phone}
              className="w-full rounded-lg border border-[#2A2A2A]/20 bg-white px-4 py-3 text-[#2A2A2A] focus:border-[#006E7F] focus:outline-none focus:ring-2 focus:ring-[#E6A445]"
            />
            {errors.phone ? (
              <p id="phone-error" className="mt-1 text-sm text-[#E6A445]">
                {errors.phone}
              </p>
            ) : (
              <p id="phone-helper" className="mt-1 text-xs text-[#2A2A2A]/60">
                We confirm timelines by phone within one business day
              </p>
            )}
          </div>
          <div>
            <label htmlFor="city" className="mb-2 block text-sm font-medium text-[#2A2A2A]">
              City <span className="text-[#E6A445]">*</span>
            </label>
            <input
              id="city"
              type="text"
              required
              value={formData.city}
              onChange={handleChange("city")}
              aria-describedby={errors.city ? "city-error" : "city-helper"}
              aria-invalid={!!errors.city}
              className="w-full rounded-lg border border-[#2A2A2A]/20 bg-white px-4 py-3 text-[#2A2A2A] focus:border-[#006E7F] focus:outline-none focus:ring-2 focus:ring-[#E6A445]"
            />
            {errors.city ? (
              <p id="city-error" className="mt-1 text-sm text-[#E6A445]">
                {errors.city}
              </p>
            ) : (
              <p id="city-helper" className="mt-1 text-xs text-[#2A2A2A]/60">
                Primary metro or submarket
              </p>
            )}
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="property" className="mb-2 block text-sm font-medium text-[#2A2A2A]">
              Property Being Sold <span className="text-[#E6A445]">*</span>
            </label>
            <input
              id="property"
              type="text"
              required
              value={formData.property}
              onChange={handleChange("property")}
              aria-describedby={errors.property ? "property-error" : "property-helper"}
              aria-invalid={!!errors.property}
              className="w-full rounded-lg border border-[#2A2A2A]/20 bg-white px-4 py-3 text-[#2A2A2A] focus:border-[#006E7F] focus:outline-none focus:ring-2 focus:ring-[#E6A445]"
            />
            {errors.property ? (
              <p id="property-error" className="mt-1 text-sm text-[#E6A445]">
                {errors.property}
              </p>
            ) : (
              <p id="property-helper" className="mt-1 text-xs text-[#2A2A2A]/60">
                Include property type, location, and estimated value
              </p>
            )}
          </div>
          <div>
            <label htmlFor="estimatedCloseDate" className="mb-2 block text-sm font-medium text-[#2A2A2A]">
              Estimated Close Date <span className="text-[#E6A445]">*</span>
            </label>
            <input
              id="estimatedCloseDate"
              type="date"
              required
              value={formData.estimatedCloseDate}
              onChange={handleChange("estimatedCloseDate")}
              aria-describedby={errors.estimatedCloseDate ? "date-error" : "date-helper"}
              aria-invalid={!!errors.estimatedCloseDate}
              className="w-full rounded-lg border border-[#2A2A2A]/20 bg-white px-4 py-3 text-[#2A2A2A] focus:border-[#006E7F] focus:outline-none focus:ring-2 focus:ring-[#E6A445]"
            />
            {errors.estimatedCloseDate ? (
              <p id="date-error" className="mt-1 text-sm text-[#E6A445]">
                {errors.estimatedCloseDate}
              </p>
            ) : (
              <p id="date-helper" className="mt-1 text-xs text-[#2A2A2A]/60">
                Determines your 45 day and 180 day milestones
              </p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-[#2A2A2A]">
            Message <span className="text-[#E6A445]">*</span>
          </label>
          <textarea
            id="message"
            rows={4}
            required
            value={formData.message}
            onChange={handleChange("message")}
            aria-describedby={errors.message ? "message-error" : "message-helper"}
            aria-invalid={!!errors.message}
            className="w-full rounded-lg border border-[#2A2A2A]/20 bg-white px-4 py-3 text-[#2A2A2A] focus:border-[#006E7F] focus:outline-none focus:ring-2 focus:ring-[#E6A445]"
          />
          {errors.message ? (
            <p id="message-error" className="mt-1 text-sm text-[#E6A445]">
              {errors.message}
            </p>
          ) : (
            <p id="message-helper" className="mt-1 text-xs text-[#2A2A2A]/60">
              Outline goals, replacement preferences, or coordination needs
            </p>
          )}
        </div>
        {siteKey && (
          <div className="flex justify-center">
            <div ref={captchaRef} className="min-h-[78px]" />
          </div>
        )}
        <button
          type="submit"
          disabled={status === "submitting" || !!(siteKey && !turnstileReady)}
          className="w-full rounded-full bg-[#E6A445] px-8 py-4 text-base font-semibold text-[#2A2A2A] shadow-lg transition hover:bg-[#C88735] focus:outline-none focus:ring-2 focus:ring-[#E6A445] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "submitting" ? "Submitting..." : "Submit Consultation Request"}
        </button>
        <p className="text-xs text-[#2A2A2A]/60">Educational content only. Not tax or legal advice.</p>
        {feedback && (
          <p
            role="status"
            aria-live="polite"
            className={`text-sm font-medium ${status === "success" ? "text-[#006E7F]" : "text-[#E6A445]"}`}
          >
            {feedback}
          </p>
        )}
      </fieldset>
    </form>
  );
}
