"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const ORCID_REGEX = /^\d{4}-\d{4}-\d{4}-\d{3}[0-9X]$/;

export default function OnboardingCard() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Refs instead of useState
  const [orcid, setOrcid] = useState("");
  const formRef = useRef();

  function handleOrcidChange(e) {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/(.{4})/g, "$1-");
    if (value.endsWith("-")) value = value.slice(0, -1);
    if (value.length > 19) value = value.slice(0, 19);
    setOrcid(value);
  }

  function handleNext(e) {
    e.preventDefault();
    if (!ORCID_REGEX.test(orcid)) {
      alert("Please enter a valid ORCID");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ orcid }));
    setStep(2);
  }

  function handleComplete(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(formRef.current));
    const prev = JSON.parse(localStorage.getItem("user") || "{}");
    localStorage.setItem("user", JSON.stringify({ ...prev, ...data }));
    router.push("/");
  }

  function handleSkip() {
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center">
      <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-6 w-full max-w-2xl shadow-lg">
        {step === 1 ? (
          <>
            <h2 className="text-lg font-semibold mb-1 text-center">
              Update Your User Profile
            </h2>
            <p className="text-sm text-neutral-400 mb-4 text-center">
              Automatically sync your profile research data.
            </p>

            <form onSubmit={handleNext} className="space-y-4">
              <div>
                <label htmlFor="orcid" className="block text-sm mb-1">
                  Add ORCID ID
                </label>
                <input
                  id="orcid"
                  value={orcid}
                  onChange={handleOrcidChange}
                  inputMode="numeric"
                  placeholder="0000-0000-0000-0000"
                  className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 outline-none focus:border-neutral-500 placeholder-neutral-400"
                />
              </div>

              <div className="flex gap-3 justify-between">
                <button
                  type="button"
                  onClick={handleSkip}
                  className="flex-1 border border-neutral-600 text-neutral-200 rounded-md py-2 hover:bg-neutral-700/40"
                >
                  Skip
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md py-2"
                >
                  Next →
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-2 text-center">
              Complete Your User Profile
            </h2>
            <p className="text-sm text-neutral-400 mb-5 text-center">
              Update your profile to help improve grant recommendations.
            </p>

            <form
              ref={formRef}
              onSubmit={handleComplete}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <Field name="name" label="Full Name" />
              <Field name="email" label="Email" />
              <Field name="location" label="Location" />
              <Field name="university" label="Associated University" />
              <Field name="primaryField" label="Primary Research Field" />
              <Field name="secondaryField" label="Secondary Research Field" />
              <Field
                name="degrees"
                label="Degrees"
                placeholder="e.g., PhD in CS, MS in AI"
                className="md:col-span-2"
              />
              <Field
                name="goalsCsv"
                label="Research Goals (comma-separated)"
                placeholder="e.g., Develop new ML models, Publish in top journals"
                className="md:col-span-2"
              />

              <div className="md:col-span-2 flex gap-3 justify-between mt-2">
                <button
                  type="button"
                  onClick={handleSkip}
                  className="flex-1 border border-neutral-600 text-neutral-200 rounded-md py-2 hover:bg-neutral-700/40"
                >
                  Skip
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md py-2"
                >
                  Complete
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Field({ name, label, className = "", placeholder = "" }) {
  return (
    <div className={className}>
      <label className="block text-sm mb-1">{label}</label>
      <input
        name={name}
        placeholder={placeholder}
        className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 placeholder-neutral-400"
      />
    </div>
  );
}
