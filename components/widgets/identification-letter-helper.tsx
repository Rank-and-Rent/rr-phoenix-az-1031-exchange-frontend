"use client";

import { useMemo, useState } from "react";
import { formatDisplayDate } from "@/lib/utils";
import { COMPANY_NAME, PRIMARY_CITY, PRIMARY_STATE_ABBR } from "@/lib/config";

type PropertyRow = {
  name: string;
  address: string;
  notes: string;
};

const defaultRows: PropertyRow[] = [
  { name: "", address: "", notes: "" },
  { name: "", address: "", notes: "" },
  { name: "", address: "", notes: "" },
];

export function IdentificationLetterHelper() {
  const [rows, setRows] = useState<PropertyRow[]>(defaultRows);
  const [taxpayerName, setTaxpayerName] = useState("");
  const [intermediaryName, setIntermediaryName] = useState("");
  const [exchangeId, setExchangeId] = useState("");
  const [isThreePropertyRule, setIsThreePropertyRule] = useState(true);
  const [city, setCity] = useState(PRIMARY_CITY);
  const [state, setState] = useState(PRIMARY_STATE_ABBR);

  const preview = useMemo(() => {
    const today = formatDisplayDate(new Date());
    const propertyLines = rows
      .filter((row) => row.name.trim() || row.address.trim())
      .map((row, index) => {
        const label = isThreePropertyRule
          ? `Property ${index + 1}`
          : `Identified Asset ${index + 1}`;
        return `${label}:\n  Name: ${row.name || "[Legal name pending]"}\n  Address or legal description: ${
          row.address || "[Legal description pending]"
        }\n  Notes: ${row.notes || "Primary candidate"}`;
      })
      .join("\n\n");

    return [
      `${today}`,
      "",
      `${intermediaryName || "[Qualified Intermediary]"}`,
      "Exchange Department",
      "",
      `Re: Identification of Replacement Property for ${taxpayerName || "[Taxpayer Name]"}`,
      "",
      "To Whom It May Concern,",
      "",
      `Pursuant to Internal Revenue Code Section 1031 and the exchange agreement executed with your firm, this letter identifies the replacement property candidates for exchange reference ${
        exchangeId || "[Exchange ID]"
      }.`,
      "",
      propertyLines || "[List identified properties here.]",
      "",
      "This identification is submitted within the 45 day period following the transfer of the relinquished property. Please confirm receipt.",
      "",
      `Sincerely,`,
      `${taxpayerName || "[Taxpayer Name]"}`,
      `${city}, ${state}`,
    ]
      .filter(Boolean)
      .join("\n");
  }, [city, exchangeId, intermediaryName, isThreePropertyRule, rows, state, taxpayerName]);

  return (
    <section className="space-y-6 rounded-3xl border border-[#2A2A2A]/10 bg-white/85 p-6 shadow-[0_18px_60px_rgba(24,24,24,0.08)]">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#006E7F]">
          Identification Letter Helper
        </p>
        <h2 className="text-2xl text-[#2A2A2A]">
          Generate a Draft Letter for Your Qualified Intermediary
        </h2>
        <p className="text-sm text-[#2A2A2A]/75">
          Complete the fields below to produce a printable identification letter. Replace all placeholders with legal names and descriptions before submitting to your intermediary.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <label className="text-sm font-semibold text-[#2A2A2A]" htmlFor="taxpayer-name">
            Taxpayer name
          </label>
          <input
            id="taxpayer-name"
            value={taxpayerName}
            onChange={(event) => setTaxpayerName(event.target.value)}
            placeholder="Example: Desert Equity Holdings LLC"
            className="w-full rounded-2xl border border-[#2A2A2A]/20 bg-white px-4 py-3 text-sm text-[#2A2A2A] focus:border-[#006E7F] focus:outline-none focus:ring-2 focus:ring-[#006E7F]"
          />
        </div>
        <div className="space-y-3">
          <label className="text-sm font-semibold text-[#2A2A2A]" htmlFor="intermediary-name">
            Qualified intermediary
          </label>
          <input
            id="intermediary-name"
            value={intermediaryName}
            onChange={(event) => setIntermediaryName(event.target.value)}
            placeholder="Example: Phoenix Exchange Services, Inc."
            className="w-full rounded-2xl border border-[#2A2A2A]/20 bg-white px-4 py-3 text-sm text-[#2A2A2A] focus:border-[#006E7F] focus:outline-none focus:ring-2 focus:ring-[#006E7F]"
          />
        </div>
        <div className="space-y-3">
          <label className="text-sm font-semibold text-[#2A2A2A]" htmlFor="exchange-id">
            Exchange reference
          </label>
          <input
            id="exchange-id"
            value={exchangeId}
            onChange={(event) => setExchangeId(event.target.value)}
            placeholder="Example: 2025-00123"
            className="w-full rounded-2xl border border-[#2A2A2A]/20 bg-white px-4 py-3 text-sm text-[#2A2A2A] focus:border-[#006E7F] focus:outline-none focus:ring-2 focus:ring-[#006E7F]"
          />
        </div>
        <div className="space-y-3">
          <label className="text-sm font-semibold text-[#2A2A2A]" htmlFor="rule-type">
            Identification rule
          </label>
          <select
            id="rule-type"
            value={isThreePropertyRule ? "three" : "other"}
            onChange={(event) => setIsThreePropertyRule(event.target.value === "three")}
            className="w-full rounded-2xl border border-[#2A2A2A]/20 bg-white px-4 py-3 text-sm text-[#2A2A2A] focus:border-[#006E7F] focus:outline-none focus:ring-2 focus:ring-[#006E7F]"
          >
            <option value="three">Three Property Rule</option>
            <option value="other">200 Percent or 95 Percent Rule</option>
          </select>
        </div>
        <div className="space-y-3">
          <label className="text-sm font-semibold text-[#2A2A2A]" htmlFor="city">
            City
          </label>
          <input
            id="city"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className="w-full rounded-2xl border border-[#2A2A2A]/20 bg-white px-4 py-3 text-sm text-[#2A2A2A] focus:border-[#006E7F] focus:outline-none focus:ring-2 focus:ring-[#006E7F]"
          />
        </div>
        <div className="space-y-3">
          <label className="text-sm font-semibold text-[#2A2A2A]" htmlFor="state">
            State abbreviation
          </label>
          <input
            id="state"
            value={state}
            onChange={(event) => setState(event.target.value.toUpperCase())}
            maxLength={2}
            className="w-full rounded-2xl border border-[#2A2A2A]/20 bg-white px-4 py-3 text-sm text-[#2A2A2A] focus:border-[#006E7F] focus:outline-none focus:ring-2 focus:ring-[#006E7F]"
          />
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[#2A2A2A]">
          Replacement property list
        </h3>
        <div className="space-y-3">
          {rows.map((row, index) => (
            <div
              key={`property-${index}`}
              className="grid gap-3 rounded-2xl border border-[#2A2A2A]/10 bg-[#F5F3EF]/60 p-4 md:grid-cols-3"
            >
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-[#2A2A2A]/70">
                  Property name
                </label>
                <input
                  value={row.name}
                  onChange={(event) => {
                    const next = [...rows];
                    next[index] = { ...next[index], name: event.target.value };
                    setRows(next);
                  }}
                  placeholder="Example: Camelback Commerce Center"
                  className="w-full rounded-xl border border-[#2A2A2A]/20 bg-white px-3 py-2 text-sm text-[#2A2A2A] focus:border-[#006E7F] focus:outline-none focus:ring-2 focus:ring-[#006E7F]"
                />
              </div>
              <div className="space-y-2 md:col-span-1">
                <label className="text-xs font-semibold uppercase tracking-widest text-[#2A2A2A]/70">
                  Address or legal description
                </label>
                <input
                  value={row.address}
                  onChange={(event) => {
                    const next = [...rows];
                    next[index] = { ...next[index], address: event.target.value };
                    setRows(next);
                  }}
                  placeholder="Insert legal description or parcel number"
                  className="w-full rounded-xl border border-[#2A2A2A]/20 bg-white px-3 py-2 text-sm text-[#2A2A2A] focus:border-[#006E7F] focus:outline-none focus:ring-2 focus:ring-[#006E7F]"
                />
              </div>
              <div className="space-y-2 md:col-span-1">
                <label className="text-xs font-semibold uppercase tracking-widest text-[#2A2A2A]/70">
                  Notes
                </label>
                <input
                  value={row.notes}
                  onChange={(event) => {
                    const next = [...rows];
                    next[index] = { ...next[index], notes: event.target.value };
                    setRows(next);
                  }}
                  placeholder="Primary | Backup | Improvement exchange"
                  className="w-full rounded-xl border border-[#2A2A2A]/20 bg-white px-3 py-2 text-sm text-[#2A2A2A] focus:border-[#006E7F] focus:outline-none focus:ring-2 focus:ring-[#006E7F]"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-dashed border-[#006E7F]/40 px-4 py-2 text-sm font-semibold text-[#006E7F] transition hover:border-[#006E7F]"
            onClick={() =>
              setRows((prev) => [...prev, { name: "", address: "", notes: "" }])
            }
          >
            Add another property
          </button>
        </div>
      </div>
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-[#2A2A2A]">Letter preview</h3>
        <textarea
          value={preview}
          readOnly
          className="h-72 w-full resize-none rounded-2xl border border-[#2A2A2A]/20 bg-white px-4 py-3 text-sm text-[#2A2A2A]"
          aria-label="Identification letter preview"
        />
        <p className="text-xs text-[#2A2A2A]/70">
          Copy this text into your letterhead. Confirm legal descriptions with your title
          company and intermediary before submission. {COMPANY_NAME} does not submit
          identification letters on your behalf.
        </p>
      </div>
    </section>
  );
}


