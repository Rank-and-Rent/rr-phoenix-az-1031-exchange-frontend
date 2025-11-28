"use client";

import { useState } from "react";
import { CalculatorIcon } from "../icons";

export function ExchangeCostEstimator() {
  const [propertyValue, setPropertyValue] = useState("");
  const [qiFeePercentage, setQiFeePercentage] = useState("0.5");
  const [escrowFee, setEscrowFee] = useState("");
  const [titleInsuranceRate, setTitleInsuranceRate] = useState("0.5");
  const [recordingFees, setRecordingFees] = useState("");

  const calculateCosts = () => {
    const propVal = parseFloat(propertyValue) || 0;
    const qiRate = parseFloat(qiFeePercentage) || 0;
    const escrow = parseFloat(escrowFee) || 0;
    const titleRate = parseFloat(titleInsuranceRate) || 0;
    const recording = parseFloat(recordingFees) || 0;

    const qiFee = propVal * (qiRate / 100);
    const titleInsurance = propVal * (titleRate / 100);
    const totalCosts = qiFee + escrow + titleInsurance + recording;

    return {
      qiFee,
      escrowFee: escrow,
      titleInsurance,
      recordingFees: recording,
      totalCosts,
    };
  };

  const results = calculateCosts();
  const hasInputs = propertyValue || escrowFee || recordingFees;

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-white/70 bg-white/70 p-8 shadow-[0_12px_40px_rgba(24,24,24,0.07)]">
        <div className="mb-6 flex items-center gap-3">
          <CalculatorIcon className="h-6 w-6 text-[#006E7F]" aria-hidden="true" />
          <h2 className="font-playfair text-2xl font-bold text-[#2A2A2A]">
            Exchange Cost Estimator
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2 sm:col-span-2">
            <label htmlFor="property-value" className="text-sm font-semibold text-[#2A2A2A]">
              Property Value
            </label>
            <input
              id="property-value"
              type="number"
              min="0"
              step="1000"
              value={propertyValue}
              onChange={(e) => setPropertyValue(e.target.value)}
              placeholder="0"
              className="w-full rounded-2xl border border-[#2A2A2A]/20 bg-white/90 px-4 py-3 text-sm text-[#2A2A2A] transition focus-visible:border-[#006E7F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
            />
            <p className="text-xs text-[#2A2A2A]/70">
              Estimated property value for cost calculation
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="qi-fee-percentage"
              className="text-sm font-semibold text-[#2A2A2A]"
            >
              QI Fee Percentage
            </label>
            <input
              id="qi-fee-percentage"
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={qiFeePercentage}
              onChange={(e) => setQiFeePercentage(e.target.value)}
              className="w-full rounded-2xl border border-[#2A2A2A]/20 bg-white/90 px-4 py-3 text-sm text-[#2A2A2A] transition focus-visible:border-[#006E7F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
            />
            <p className="text-xs text-[#2A2A2A]/70">Typical range: 0.5% to 1.5%</p>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="escrow-fee" className="text-sm font-semibold text-[#2A2A2A]">
              Escrow Fee
            </label>
            <input
              id="escrow-fee"
              type="number"
              min="0"
              step="100"
              value={escrowFee}
              onChange={(e) => setEscrowFee(e.target.value)}
              placeholder="0"
              className="w-full rounded-2xl border border-[#2A2A2A]/20 bg-white/90 px-4 py-3 text-sm text-[#2A2A2A] transition focus-visible:border-[#006E7F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
            />
            <p className="text-xs text-[#2A2A2A]/70">Flat escrow fee amount</p>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="title-insurance-rate"
              className="text-sm font-semibold text-[#2A2A2A]"
            >
              Title Insurance Rate (%)
            </label>
            <input
              id="title-insurance-rate"
              type="number"
              min="0"
              max="2"
              step="0.1"
              value={titleInsuranceRate}
              onChange={(e) => setTitleInsuranceRate(e.target.value)}
              className="w-full rounded-2xl border border-[#2A2A2A]/20 bg-white/90 px-4 py-3 text-sm text-[#2A2A2A] transition focus-visible:border-[#006E7F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
            />
            <p className="text-xs text-[#2A2A2A]/70">Typical range: 0.3% to 0.8%</p>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="recording-fees" className="text-sm font-semibold text-[#2A2A2A]">
              Recording Fees
            </label>
            <input
              id="recording-fees"
              type="number"
              min="0"
              step="50"
              value={recordingFees}
              onChange={(e) => setRecordingFees(e.target.value)}
              placeholder="0"
              className="w-full rounded-2xl border border-[#2A2A2A]/20 bg-white/90 px-4 py-3 text-sm text-[#2A2A2A] transition focus-visible:border-[#006E7F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
            />
            <p className="text-xs text-[#2A2A2A]/70">
              Maricopa County recording fees (typically $50-$200)
            </p>
          </div>
        </div>
      </div>

      {hasInputs && (
        <div className="rounded-2xl border border-white/70 bg-white/70 p-8 shadow-[0_12px_40px_rgba(24,24,24,0.07)]">
          <h3 className="mb-6 font-playfair text-xl font-bold text-[#2A2A2A]">
            Estimated Exchange Costs
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#2A2A2A]/10 pb-3">
              <span className="text-sm text-[#2A2A2A]/75">Qualified Intermediary Fee</span>
              <span className="font-semibold text-[#2A2A2A]">
                ${results.qiFee.toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-[#2A2A2A]/10 pb-3">
              <span className="text-sm text-[#2A2A2A]/75">Escrow Fee</span>
              <span className="font-semibold text-[#2A2A2A]">
                ${results.escrowFee.toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-[#2A2A2A]/10 pb-3">
              <span className="text-sm text-[#2A2A2A]/75">Title Insurance</span>
              <span className="font-semibold text-[#2A2A2A]">
                ${results.titleInsurance.toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-[#2A2A2A]/10 pb-3">
              <span className="text-sm text-[#2A2A2A]/75">Recording Fees</span>
              <span className="font-semibold text-[#2A2A2A]">
                ${results.recordingFees.toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>

            <div className="flex items-center justify-between border-t-2 border-[#006E7F]/30 pt-4">
              <span className="font-semibold text-[#2A2A2A]">Total Estimated Costs</span>
              <span className="font-bold text-[#006E7F]">
                ${results.totalCosts.toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-[#006E7F]/20 bg-[#006E7F]/8 p-6">
        <h4 className="mb-3 font-semibold text-[#006E7F]">Arizona Exchange Costs</h4>
        <div className="space-y-2 text-sm text-[#2A2A2A]/80">
          <p>
            <strong>No State Transfer Tax:</strong> Arizona does not impose a state real estate
            transfer tax. Recording fees and title insurance premiums still apply.
          </p>
          <p>
            <strong>Maricopa County:</strong> Recording fees are typically $50 to $200 depending
            on document type and number of pages.
          </p>
          <p>
            <strong>Costs Vary:</strong> Actual costs depend on property value, QI provider,
            title company, and specific transaction details.
          </p>
        </div>
      </div>
    </div>
  );
}


