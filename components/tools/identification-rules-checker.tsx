"use client";

import { useState } from "react";
import { ShieldCheckIcon } from "../icons";

export function IdentificationRulesChecker() {
  const [numProperties, setNumProperties] = useState("");
  const [totalIdentifiedValue, setTotalIdentifiedValue] = useState("");
  const [relinquishedValue, setRelinquishedValue] = useState("");

  const checkRules = () => {
    const numProps = parseInt(numProperties) || 0;
    const totalIdVal = parseFloat(totalIdentifiedValue) || 0;
    const relVal = parseFloat(relinquishedValue) || 0;

    const threePropertyRule = numProps <= 3 && numProps > 0;
    const twoHundredPercentRule = relVal > 0 && totalIdVal <= relVal * 2;
    const ninetyFivePercentRule =
      relVal > 0 && totalIdVal >= relVal * 0.95 && totalIdVal <= relVal * 2;

    return {
      threePropertyRule,
      twoHundredPercentRule,
      ninetyFivePercentRule,
      isValid: threePropertyRule || twoHundredPercentRule || ninetyFivePercentRule,
      numProps,
      totalIdVal,
      relVal,
    };
  };

  const results = checkRules();
  const hasInputs = numProperties || totalIdentifiedValue || relinquishedValue;

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-white/70 bg-white/70 p-8 shadow-[0_12px_40px_rgba(24,24,24,0.07)]">
        <div className="mb-6 flex items-center gap-3">
          <ShieldCheckIcon className="h-6 w-6 text-[#006E7F]" aria-hidden="true" />
          <h2 className="font-playfair text-2xl font-bold text-[#2A2A2A]">
            Identification Rules Checker
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="num-properties"
              className="text-sm font-semibold text-[#2A2A2A]"
            >
              Number of Properties Identified
            </label>
            <input
              id="num-properties"
              type="number"
              min="1"
              step="1"
              value={numProperties}
              onChange={(e) => setNumProperties(e.target.value)}
              placeholder="0"
              className="w-full rounded-2xl border border-[#2A2A2A]/20 bg-white/90 px-4 py-3 text-sm text-[#2A2A2A] transition focus-visible:border-[#006E7F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
            />
            <p className="text-xs text-[#2A2A2A]/70">
              Total number of replacement properties identified
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="total-identified-value"
              className="text-sm font-semibold text-[#2A2A2A]"
            >
              Total Value of Identified Properties
            </label>
            <input
              id="total-identified-value"
              type="number"
              min="0"
              step="1000"
              value={totalIdentifiedValue}
              onChange={(e) => setTotalIdentifiedValue(e.target.value)}
              placeholder="0"
              className="w-full rounded-2xl border border-[#2A2A2A]/20 bg-white/90 px-4 py-3 text-sm text-[#2A2A2A] transition focus-visible:border-[#006E7F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
            />
            <p className="text-xs text-[#2A2A2A]/70">
              Combined value of all identified replacement properties
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:col-span-2">
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
              Sale price of the relinquished property
            </p>
          </div>
        </div>
      </div>

      {hasInputs && (
        <div className="space-y-4">
          <div
            className={`rounded-2xl border p-6 shadow-[0_12px_40px_rgba(24,24,24,0.07)] ${
              results.threePropertyRule
                ? "border-[#006E7F]/30 bg-[#006E7F]/10"
                : "border-white/70 bg-white/70"
            }`}
          >
            <div className="flex items-start gap-3">
              <ShieldCheckIcon
                className={`h-6 w-6 flex-shrink-0 ${
                  results.threePropertyRule ? "text-[#006E7F]" : "text-[#2A2A2A]/30"
                }`}
                aria-hidden="true"
              />
              <div className="flex-1">
                <h3 className="mb-2 font-semibold text-[#2A2A2A]">Three Property Rule</h3>
                <p className="mb-3 text-sm text-[#2A2A2A]/75">
                  Identify up to three replacement properties regardless of total value.
                </p>
                {results.threePropertyRule ? (
                  <p className="text-sm font-semibold text-[#006E7F]">
                    ✓ Rule satisfied. You may identify up to three properties.
                  </p>
                ) : (
                  <p className="text-sm text-[#2A2A2A]/70">
                    {results.numProps > 3
                      ? "✗ Rule not satisfied. More than three properties identified."
                      : "Enter number of properties to check this rule."}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div
            className={`rounded-2xl border p-6 shadow-[0_12px_40px_rgba(24,24,24,0.07)] ${
              results.twoHundredPercentRule
                ? "border-[#006E7F]/30 bg-[#006E7F]/10"
                : "border-white/70 bg-white/70"
            }`}
          >
            <div className="flex items-start gap-3">
              <ShieldCheckIcon
                className={`h-6 w-6 flex-shrink-0 ${
                  results.twoHundredPercentRule ? "text-[#006E7F]" : "text-[#2A2A2A]/30"
                }`}
                aria-hidden="true"
              />
              <div className="flex-1">
                <h3 className="mb-2 font-semibold text-[#2A2A2A]">Two Hundred Percent Rule</h3>
                <p className="mb-3 text-sm text-[#2A2A2A]/75">
                  Identify unlimited properties if total value does not exceed 200% of
                  relinquished property value.
                </p>
                {results.relVal > 0 ? (
                  results.twoHundredPercentRule ? (
                    <p className="text-sm font-semibold text-[#006E7F]">
                      ✓ Rule satisfied. Total identified value is within 200% limit.
                    </p>
                  ) : (
                    <p className="text-sm text-[#2A2A2A]/70">
                      ✗ Rule not satisfied. Total identified value exceeds 200% of relinquished
                      property value.
                    </p>
                  )
                ) : (
                  <p className="text-sm text-[#2A2A2A]/70">
                    Enter relinquished property value to check this rule.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div
            className={`rounded-2xl border p-6 shadow-[0_12px_40px_rgba(24,24,24,0.07)] ${
              results.ninetyFivePercentRule
                ? "border-[#006E7F]/30 bg-[#006E7F]/10"
                : "border-white/70 bg-white/70"
            }`}
          >
            <div className="flex items-start gap-3">
              <ShieldCheckIcon
                className={`h-6 w-6 flex-shrink-0 ${
                  results.ninetyFivePercentRule ? "text-[#006E7F]" : "text-[#2A2A2A]/30"
                }`}
                aria-hidden="true"
              />
              <div className="flex-1">
                <h3 className="mb-2 font-semibold text-[#2A2A2A]">Ninety Five Percent Rule</h3>
                <p className="mb-3 text-sm text-[#2A2A2A]/75">
                  Identify unlimited properties if at least 95% of identified value is acquired.
                </p>
                {results.relVal > 0 ? (
                  results.ninetyFivePercentRule ? (
                    <p className="text-sm font-semibold text-[#006E7F]">
                      ✓ Rule satisfied. Identified value meets 95% requirement.
                    </p>
                  ) : (
                    <p className="text-sm text-[#2A2A2A]/70">
                      ✗ Rule not satisfied. Identified value does not meet 95% requirement or
                      exceeds 200% limit.
                    </p>
                  )
                ) : (
                  <p className="text-sm text-[#2A2A2A]/70">
                    Enter values to check this rule. This rule requires acquiring at least 95% of
                    identified value.
                  </p>
                )}
              </div>
            </div>
          </div>

          {results.isValid && (
            <div className="rounded-xl border border-[#006E7F]/30 bg-[#006E7F]/10 p-4">
              <p className="text-sm font-semibold text-[#006E7F]">
                ✓ Your identification appears to comply with at least one identification rule.
              </p>
            </div>
          )}
        </div>
      )}

      <div className="rounded-2xl border border-[#006E7F]/20 bg-[#006E7F]/8 p-6">
        <h4 className="mb-3 font-semibold text-[#006E7F]">Identification Rules Explained</h4>
        <div className="space-y-3 text-sm text-[#2A2A2A]/80">
          <div>
            <p className="font-semibold text-[#2A2A2A]">Three Property Rule:</p>
            <p>
              Identify up to three replacement properties regardless of total value. At least one
              identified property must be acquired.
            </p>
          </div>
          <div>
            <p className="font-semibold text-[#2A2A2A]">Two Hundred Percent Rule:</p>
            <p>
              Identify unlimited properties if total value does not exceed 200% of relinquished
              property value. At least one identified property must be acquired.
            </p>
          </div>
          <div>
            <p className="font-semibold text-[#2A2A2A]">Ninety Five Percent Rule:</p>
            <p>
              Identify unlimited properties if at least 95% of identified value is acquired. This
              rule provides maximum flexibility but requires careful value tracking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


