"use client";

import { useMemo, useState } from "react";
import { addDays, formatDisplayDate } from "@/lib/utils";

const milestones = [
  { label: "Deadline kickoff", offset: 0, description: "Relinquished property closing. Exchange proceeds transfer to the qualified intermediary." },
  { label: "Day 15 status check", offset: 15, description: "Confirm access to candidate properties, order inspections, and coordinate lender documents." },
  { label: "Day 30 documentation", offset: 30, description: "Request updated rent rolls, T12 statements, and preliminary title reports for identified assets." },
  { label: "Day 40 verification", offset: 40, description: "Lock identification letter details, confirm backup options, and resolve open contingencies." },
  { label: "Day 45 identification", offset: 45, description: "Submit the signed identification letter to the qualified intermediary by midnight MST." },
  { label: "Day 90 financing lock", offset: 90, description: "Finalize loan terms, appraisal reports, and closing schedules for each replacement property." },
  { label: "Day 135 readiness review", offset: 135, description: "Complete insurance, entity, and closing deliverables for each property in the pipeline." },
  { label: "Day 170 escrow audit", offset: 170, description: "Audit settlement statements and wire instructions ahead of the completion deadline." },
  { label: "Day 180 completion", offset: 180, description: "All replacement properties must close or the exchange must be reported with boot exposure." },
];

export function TimelineTracker() {
  const [closingDate, setClosingDate] = useState<string>("");

  const schedule = useMemo(() => {
    if (!closingDate) {
      return null;
    }
    const baseDate = new Date(`${closingDate}T00:00:00-07:00`);
    return milestones.map((item) => ({
      ...item,
      date: addDays(baseDate, item.offset),
    }));
  }, [closingDate]);

  return (
    <section className="space-y-4 rounded-3xl border border-[#006E7F]/20 bg-white/85 p-6 shadow-[0_18px_60px_rgba(24,24,24,0.08)]">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#006E7F]">
          Timeline Tracker
        </p>
        <h2 className="text-2xl text-[#2A2A2A]">
          Visualize Every Milestone from Sale to Replacement Closing
        </h2>
        <p className="text-sm text-[#2A2A2A]/75">
          Enter the relinquished closing date to generate a Phoenix-aware milestone schedule.
          Share with your advisory team to keep tasks aligned with IRS deadlines.
        </p>
      </header>
      <div className="space-y-3">
        <label className="text-sm font-semibold text-[#2A2A2A]" htmlFor="timeline-closing-date">
          Relinquished property closing date
        </label>
        <input
          id="timeline-closing-date"
          type="date"
          value={closingDate}
          onChange={(event) => setClosingDate(event.target.value)}
          className="w-full rounded-2xl border border-[#2A2A2A]/20 bg-white px-4 py-3 text-sm text-[#2A2A2A] focus:border-[#006E7F] focus:outline-none focus:ring-2 focus:ring-[#006E7F]"
        />
      </div>
      {schedule ? (
        <ol className="space-y-3">
          {schedule.map((item) => (
            <li
              key={item.label}
              className="rounded-2xl border border-[#2A2A2A]/10 bg-[#F5F3EF]/60 p-4"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#2A2A2A]">
                    {item.label}
                  </p>
                  <p className="text-xs uppercase tracking-widest text-[#006E7F]">
                    Day {item.offset}
                  </p>
                </div>
                <p className="text-sm font-semibold text-[#2A2A2A]">
                  {formatDisplayDate(item.date)}
                </p>
              </div>
              <p className="mt-2 text-sm text-[#2A2A2A]/75">{item.description}</p>
            </li>
          ))}
        </ol>
      ) : (
        <p className="rounded-2xl border border-dashed border-[#2A2A2A]/15 bg-[#F5F3EF]/60 p-4 text-sm text-[#2A2A2A]/70">
          Enter the sale closing date to generate a milestone tracker for your Phoenix exchange.
        </p>
      )}
    </section>
  );
}


