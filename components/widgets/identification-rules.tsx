export function IdentificationRules() {
  const rules = [
    {
      name: "Three Property Rule",
      summary:
        "Identify up to three replacement properties of any value. Close on one or more of them within 180 days.",
      whenToUse:
        "Common when each candidate offers strong certainty of closing or when high-value assets exceed the 200 percent threshold.",
      compliance:
        "Provide legal descriptions for every property. Backup options must be clearly labeled in the identification letter.",
    },
    {
      name: "200 Percent Rule",
      summary:
        "Identify any number of properties as long as the aggregate fair market value does not exceed 200 percent of the relinquished sale price.",
      whenToUse:
        "Helpful when investors want multiple options across Phoenix, Tucson, or out-of-state markets while maintaining optionality.",
      compliance:
        "Track contract values and amendments. Update the intermediary immediately if price changes push the aggregate total above 200 percent.",
    },
    {
      name: "95 Percent Rule",
      summary:
        "Identify any number of properties regardless of value and acquire at least 95 percent of the total identified value.",
      whenToUse:
        "Reserved for portfolios with numerous assets or DST tranches where closing on nearly every property is practical.",
      compliance:
        "Maintain a portfolio dashboard with contract, inspection, and funding statuses. Missing the 95 percent threshold can void the exchange.",
    },
  ];

  return (
    <section className="space-y-4 rounded-3xl border border-[#2A2A2A]/10 bg-white/85 p-6 shadow-[0_18px_60px_rgba(24,24,24,0.08)]">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#006E7F]">
          Identification Rules
        </p>
        <h2 className="text-2xl text-[#2A2A2A]">
          Three Paths for Compliant Replacement Identification
        </h2>
        <p className="text-sm text-[#2A2A2A]/75">
          Every Phoenix exchange must follow one of the IRS-approved identification
          tests. Use this overview to confirm which path aligns with your portfolio
          and timeline.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        {rules.map((rule) => (
          <article
            key={rule.name}
            className="flex h-full flex-col rounded-2xl border border-[#E6A445]/20 bg-[#F5F3EF]/60 p-4"
          >
            <h3 className="text-lg font-semibold text-[#2A2A2A]">{rule.name}</h3>
            <p className="mt-2 text-sm text-[#2A2A2A]/75">{rule.summary}</p>
            <div className="mt-4 space-y-2 text-sm text-[#2A2A2A]/75">
              <p className="font-semibold text-[#006E7F]">When to use</p>
              <p>{rule.whenToUse}</p>
            </div>
            <div className="mt-4 space-y-2 text-sm text-[#2A2A2A]/75">
              <p className="font-semibold text-[#E6A445]">Compliance focus</p>
              <p>{rule.compliance}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}


