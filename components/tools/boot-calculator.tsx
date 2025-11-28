"use client";

import { useState } from "react";
import { CalculatorIcon } from "../icons";

export function BootCalculator() {
  const [relinquishedValue, setRelinquishedValue] = useState("");
  const [replacementValue, setReplacementValue] = useState("");
  const [cashReceived, setCashReceived] = useState("");
  const [oldMortgage, setOldMortgage] = useState("");
  const [newMortgage, setNewMortgage] = useState("");

  const calculateBoot = () => {
    const relVal = parseFloat(relinquishedValue) || 0;
    const repVal = parseFloat(replacementValue) || 0;
    const cash = parseFloat(cashReceived) || 0;
    const oldMort = parseFloat(oldMortgage) || 0;
    const newMort = parseFloat(newMortgage) || 0;

    const mortgageBoot = Math.max(0, oldMort - newMort);
    const totalBoot = cash + mortgageBoot;
    const estimatedTax = totalBoot * 0.2; // 20% illustrative rate

    return {
      cashBoot: cash,
      mortgageBoot,
      totalBoot,
      estimatedTax,
      hasBoot: totalBoot > 0,
    };
  };

  const results = calculateBoot();
  const hasInputs =
    relinquishedValue || replacementValue || cashReceived || oldMortgage || newMortgage;

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-white/70 bg-white/70 p-8 shadow-[0_12px_40px_rgba(24,24,24,0.07)]">
        <div className="mb-6 flex items-center gap-3">
          <CalculatorIcon className="h-6 w-6 text-[#006E7F]" aria-hidden="true" />
          <h2 className="font-playfair text-2xl font-bold text-[#2A2A2A]">
            Boot Calculator
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="relinquished-value"
              className="text-sm font-semibold text-[#2A2A2A]"
            >
              Relinquished Property Value
            </label>
            <input
              id="relinquished-value"
              type="number"
              min="0"
              step="1000"
              value={relinquishedValue}
              onChange={(e) => setRelinquishedValue(e.target.value)}
              placeholder="0"
              className="w-full rounded-2xl border border-[#2A2A2A]/20 bg-white/90 px-4 py-3 text-sm text-[#2A2A2A] transition focus-visible:border-[#006E7F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
            />
            <p className="text-xs text-[#2A2A2A]/70">
              Sale price of the property being sold
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="replacement-value"
              className="text-sm font-semibold text-[#2A2A2A]"
            >
              Replacement Property Value
            </label>
            <input
              id="replacement-value"
              type="number"
              min="0"
              step="1000"
              value={replacementValue}
              onChange={(e) => setReplacementValue(e.target.value)}
              placeholder="0"
              className="w-full rounded-2xl border border-[#2A2A2A]/20 bg-white/90 px-4 py-3 text-sm text-[#2A2A2A] transition focus-visible:border-[#006E7F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
            />
            <p className="text-xs text-[#2A2A2A]/70">
              Purchase price of the replacement property
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="cash-received" className="text-sm font-semibold text-[#2A2A2A]">
              Cash Received
            </label>
            <input
              id="cash-received"
              type="number"
              min="0"
              step="1000"
              value={cashReceived}
              onChange={(e) => setCashReceived(e.target.value)}
              placeholder="0"
              className="w-full rounded-2xl border border-[#2A2A2A]/20 bg-white/90 px-4 py-3 text-sm text-[#2A2A2A] transition focus-visible:border-[#006E7F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
            />
            <p className="text-xs text-[#2A2A2A]/70">
              Cash received from the exchange proceeds
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="old-mortgage" className="text-sm font-semibold text-[#2A2A2A]">
              Old Mortgage Balance
            </label>
            <input
              id="old-mortgage"
              type="number"
              min="0"
              step="1000"
              value={oldMortgage}
              onChange={(e) => setOldMortgage(e.target.value)}
              placeholder="0"
              className="w-full rounded-2xl border border-[#2A2A2A]/20 bg-white/90 px-4 py-3 text-sm text-[#2A2A2A] transition focus-visible:border-[#006E7F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
            />
            <p className="text-xs text-[#2A2A2A]/70">
              Mortgage balance on relinquished property
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:col-span-2">
            <label htmlFor="new-mortgage" className="text-sm font-semibold text-[#2A2A2A]">
              New Mortgage Balance
            </label>
            <input
              id="new-mortgage"
              type="number"
              min="0"
              step="1000"
              value={newMortgage}
              onChange={(e) => setNewMortgage(e.target.value)}
              placeholder="0"
              className="w-full rounded-2xl border border-[#2A2A2A]/20 bg-white/90 px-4 py-3 text-sm text-[#2A2A2A] transition focus-visible:border-[#006E7F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
            />
            <p className="text-xs text-[#2A2A2A]/70">
              Mortgage balance on replacement property
            </p>
          </div>
        </div>
      </div>

      {hasInputs && (
        <div className="rounded-2xl border border-white/70 bg-white/70 p-8 shadow-[0_12px_40px_rgba(24,24,24,0.07)]">
          <h3 className="mb-6 font-playfair text-xl font-bold text-[#2A2A2A]">
            Calculation Results
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#2A2A2A]/10 pb-3">
              <span className="text-sm text-[#2A2A2A]/75">Cash Boot</span>
              <span className="font-semibold text-[#2A2A2A]">
                ${results.cashBoot.toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-[#2A2A2A]/10 pb-3">
              <span className="text-sm text-[#2A2A2A]/75">Mortgage Boot</span>
              <span className="font-semibold text-[#2A2A2A]">
                ${results.mortgageBoot.toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-[#2A2A2A]/20 pb-3">
              <span className="font-semibold text-[#2A2A2A]">Total Boot</span>
              <span
                className={`font-bold ${
                  results.hasBoot ? "text-[#E6A445]" : "text-[#006E7F]"
                }`}
              >
                ${results.totalBoot.toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>

            {results.hasBoot && (
              <div className="rounded-xl border border-[#E6A445]/30 bg-[#E6A445]/10 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#2A2A2A]">
                    Estimated Tax on Boot
                  </span>
                  <span className="font-bold text-[#E6A445]">
                    ${results.estimatedTax.toLocaleString("en-US", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
                <p className="mt-2 text-xs text-[#2A2A2A]/70">
                  Based on illustrative 20% rate. Actual tax rate depends on your tax bracket
                  and holding period.
                </p>
              </div>
            )}

            {!results.hasBoot && (
              <div className="rounded-xl border border-[#006E7F]/30 bg-[#006E7F]/10 p-4">
                <p className="text-sm font-semibold text-[#006E7F]">
                  No boot detected. Full exchange deferral may be possible.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-[#006E7F]/20 bg-[#006E7F]/8 p-6">
        <h4 className="mb-3 font-semibold text-[#006E7F]">Understanding Boot</h4>
        <div className="space-y-2 text-sm text-[#2A2A2A]/80">
          <p>
            <strong>Cash Boot:</strong> Any cash received from exchange proceeds that is not
            reinvested in replacement property.
          </p>
          <p>
            <strong>Mortgage Boot:</strong> Debt relief occurs when the new mortgage is less
            than the old mortgage balance.
          </p>
          <p>
            <strong>Total Boot:</strong> The sum of cash boot and mortgage boot. Boot is subject
            to immediate taxation.
          </p>
        </div>
      </div>
    </div>
  );
}


