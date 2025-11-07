"use client";

import { useState, useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  completeOnboardingAction,
  checkOrcidAction,
} from "@/app/actions/userActions";
import { useRouter } from "next/navigation";

export default function OnboardingCard() {
  const router = useRouter();
  const [orcid, setOrcid] = useState("");
  const [result, formAction] = useActionState(checkOrcidAction, null);
  const effectiveStep = result?.needsInfo ? 2 : 1;
  const orcidValue = result?.orcid ?? orcid;

  function handleOrcidChange(e) {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/(.{4})/g, "$1-");
    if (value.endsWith("-")) value = value.slice(0, -1);
    if (value.length > 19) value = value.slice(0, 19);
    setOrcid(value);
  }

  function handleSkip() {
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-mainbg text-text-pri flex items-center justify-center">
      <div className="bg-lgrey border border-search rounded-xl p-6 w-full max-w-2xl shadow-lg">
        {effectiveStep === 1 ? (
          <>
            <h2 className="text-lg font-semibold mb-1 text-center">
              Update Your User Profile
            </h2>
            <p className="text-sm text-text-sec mb-4 text-center">
              Automatically sync your profile research data.
            </p>

            <form action={formAction} className="space-y-4">
              <div>
                <label htmlFor="orcid" className="block text-sm mb-1">
                  Add ORCID ID
                </label>
                <input
                  id="orcid"
                  name="orcid"
                  value={orcidValue}
                  onChange={handleOrcidChange}
                  inputMode="numeric"
                  placeholder="0000-0000-0000-0000"
                  className="w-full rounded-md border border-search bg-mainbg px-3 py-2 outline-none focus:border-text-sec placeholder-text-sec"
                />
              </div>

              <div className="flex gap-3 justify-between">
                <button
                  type="button"
                  onClick={handleSkip}
                  className="flex-1 border border-search text-inwhite rounded-md py-2 hover:bg-mgrey hover:text-text-pri"
                >
                  Skip
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-700/70 hover:bg-blue-700 text-white rounded-md py-2"
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
            <p className="text-sm text-text-sec mb-5 text-center">
              Update your profile to help improve grant recommendations.
            </p>

            <form
              action={completeOnboardingAction}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input type="hidden" name="orcid" value={orcidValue} />
              <Field
                name="name"
                label="Full Name"
                defaultValue={result?.user?.name}
              />
              <Field
                name="email"
                label="Email"
                defaultValue={result?.user?.email}
              />
              <Field
                name="location"
                label="Location"
                defaultValue={result?.user?.grant_search_preferences.location}
              />
              <Field
                name="university"
                label="Associated University"
                defaultValue={result?.user?.institution}
              />
              <Field
                name="primaryField"
                label="Primary Research Field"
                defaultValue={
                  result?.user?.grant_search_preferences.primary_research_field
                }
              />
              <Field
                name="secondaryField"
                label="Secondary Research Field"
                defaultValue={
                  result?.user?.grant_search_preferences
                    .secondary_research_field
                }
              />
              <Field
                name="degrees"
                label="Degrees"
                defaultValue={(
                  result?.user?.grant_search_preferences.degrees || []
                ).join(", ")}
                placeholder="e.g., PhD in CS, MS in AI"
                className="md:col-span-2"
              />
              <Field
                name="goalsCsv"
                label="Research Goals (comma-separated)"
                defaultValue={(
                  result?.user?.grant_search_preferences.research_goals || []
                ).join(", ")}
                placeholder="e.g., Develop new ML models, Publish in top journals"
                className="md:col-span-2"
              />

              <div className="md:col-span-2 flex gap-3 justify-between mt-2">
                <button
                  type="button"
                  onClick={handleSkip}
                  className="flex-1 border border-neutral-600 text-inwhite rounded-md py-2 hover:bg-mgrey hover:text-text-pri"
                >
                  Skip
                </button>
                <SubmitButton />
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Field({
  name,
  label,
  className = "",
  placeholder = "",
  defaultValue = "",
}) {
  return (
    <div className={className}>
      <label className="block text-sm mb-1">{label}</label>
      <input
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full rounded-md border border-search bg-mainbg px-3 py-2 placeholder-text-sec"
      />
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex-1 bg-blue-700/70 hover:bg-blue-700 disabled:opacity-60 text-white rounded-md py-2"
    >
      {pending ? "Saving..." : "Complete"}
    </button>
  );
}
