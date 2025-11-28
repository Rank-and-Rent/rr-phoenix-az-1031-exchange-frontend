"use client";

import { useMemo, useState } from "react";
import { addDays, formatDisplayDate } from "@/lib/utils";

export function DeadlineCalculator() {
  const [closingDate, setClosingDate] = useState<string>("");

  const deadlines = useMemo(() => {
    if (!closingDate) {
      return null;
    }
    const baseDate = new Date(`${closingDate}T00:00:00-07:00`);
    const identification = addDays(baseDate, 45);
    const completion = addDays(baseDate, 180);
    return {
      identification,
      completion,
    };
  }, [closingDate]);

  return (
    <section className="space-y-4 rounded-3xl border border-[#006E7F]/20 bg-white/85 p-6 shadow-[0_18px_60px_rgba(24,24,24,0.08)]">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#006E7F]">
          Deadline Calculator
        </p>
        <h2 className="text-2xl text-[#2A2A2A]">45 Day and 180 Day Tracker</h2>
        <p className="text-sm text-[#2A2A2A]/75">
          Enter the closing date of the relinquished property. Deadlines are
          calculated using Mountain Standard Time to match Phoenix requirements.
        </p>
      </header>
      <div className="space-y-3">
        <label
          htmlFor="closing-date"
          className="text-sm font-semibold text-[#2A2A2A]"
        >
          Relinquished property closing date
        </label>
        <input
          id="closing-date"
          name="closing-date"
          type="date"
          value={closingDate}
          onChange={(event) => setClosingDate(event.target.value)}
          className="w-full rounded-2xl border border-[#2A2A2A]/20 bg-white px-4 py-3 text-sm text-[#2A2A2A] focus:border-[#006E7F] focus:outline-none focus:ring-2 focus:ring-[#006E7F]"
        />
      </div>
      {deadlines ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#006E7F]/20 bg-[#006E7F]/8 p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#006E7F]">
              Identification deadline
            </p>
            <p className="mt-2 text-lg font-semibold text-[#2A2A2A]">
              {formatDisplayDate(deadlines.identification)}
            </p>
            <p className="mt-1 text-xs text-[#2A2A2A]/70">
              Deliver written identification to the qualified intermediary before
              midnight MST.
            </p>
          </div>
          <div className="rounded-2xl border border-[#E6A445]/30 bg-[#E6A445]/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#E6A445]">
              Completion deadline
            </p>
            <p className="mt-2 text-lg font-semibold text-[#2A2A2A]">
              {formatDisplayDate(deadlines.completion)}
            </p>
            <p className="mt-1 text-xs text-[#2A2A2A]/70">
              Replacement property must close on or before this date or the tax
              return due date, whichever comes first.
            </p>
          </div>
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-[#2A2A2A]/15 bg-[#F5F3EF]/60 p-4 text-sm text-[#2A2A2A]/70">
          Provide a closing date to see your identification and completion
          milestones.
        </p>
      )}
    </section>
  );
}


