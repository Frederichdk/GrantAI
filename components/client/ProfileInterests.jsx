"use client";
import { useState } from "react";
import { updateProfileAction } from "@/app/actions/userActions";

export default function ProfileInterests({ user, activeLabel }) {
  const [editing, setEditing] = useState(false);
  const gsp = user.grant_search_preferences || {};
  return (
    <form action={updateProfileAction} className="flex flex-col gap-4">
      <input type="hidden" name="orcid" value={user.orcid} />
      <input type="hidden" name="tab" value="interests" />
      <div className="flex w-full justify-between items-center px-6 pb-4 border-b-2 border-hover h-14">
        <h2 className="text-lg text-text-pri/90 font-semibold">
          {activeLabel}
        </h2>
        {!editing ? (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="px-3 py-1.5 text-sm rounded-md border border-search hover:bg-lgrey/60"
          >
            Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="px-3 py-1.5 text-sm rounded-md border border-search hover:bg-lgrey/60"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 text-sm rounded-md bg-blue-700/70 hover:bg-blue-700 text-text-pri"
            >
              Save
            </button>
          </div>
        )}
      </div>
      <div className="max-h-[60vh] overflow-y-auto min-h-0 overscroll-contain custom-scroll">
        <div className="px-6 flex flex-col gap-4">
          <div className="rounded-lg border border-lgrey p-6 bg-hover">
            <h3 className="text-text-pri/80 font-semibold">Research Fields</h3>
            <div className="grid grid-cols-1 gap-y-4 text-sm pt-4">
              <Field
                label="Primary Research Field"
                name="primaryField"
                value={gsp.primary_research_field}
                editing={editing}
              />
              <Field
                label="Secondary Research Field"
                name="secondaryField"
                value={gsp.secondary_research_field}
                editing={editing}
              />
            </div>
          </div>
          <div className="rounded-lg border border-lgrey p-6 bg-hover">
            <h3 className="text-text-pri/80 font-semibold">
              Research Keywords or Goals
            </h3>
            <div className="grid grid-cols-1 gap-y-4 text-sm pt-4">
              <GoalsField
                name="goalsCsv"
                value={(gsp.research_goals || []).join(", ")}
                editing={editing}
              />
            </div>
          </div>
          <div className="rounded-lg border border-lgrey p-6 bg-hover">
            <h3 className="text-text-pri/80 font-semibold">
              Grant Preferences
            </h3>
            <div className="grid grid-cols-2 gap-y-4 text-sm pt-4">
              <DesiredFundingField
                editing={editing}
                value={gsp.desired_funding}
              />
              <Field
                label="Project Duration (years)"
                name="project_duration"
                value={gsp.project_duration}
                editing={editing}
              />
            </div>
          </div>
          <div className="rounded-lg border border-lgrey p-6 bg-hover">
            <h3 className="text-text-pri/80 font-semibold">Collaboration</h3>
            <div className="grid grid-cols-1 gap-y-4 text-sm pt-4">
              <CollaborationField
                editing={editing}
                value={gsp.collaboration_interest}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

function Field({ label, name, value, editing }) {
  return (
    <div>
      <p className="text-text-pri/80">{label}</p>
      {editing ? (
        <input
          name={name}
          defaultValue={value || ""}
          className="w-1/2 rounded-md border text-sm border-search bg-mainbg px-3 py-2"
          data-1p-ignore="true"
        />
      ) : (
        <p className="text-text-sec">{value || "Not Specified"}</p>
      )}
    </div>
  );
}

function GoalsField({ name, value, editing }) {
  const items = String(value || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div>
      {editing ? (
        <input
          name={name}
          defaultValue={value || ""}
          placeholder="e.g., technological advancement, clinical use"
          className="mt-1 w-1/2 rounded-md border text-sm border-search bg-mainbg px-3 py-2 placeholder:text-text-sec"
          data-1p-ignore="true"
        />
      ) : items.length > 0 ? (
        <div className="mt-2 flex flex-wrap gap-2">
          {items.map((goal, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs rounded-full bg-search/70 text-inwhite border border-search wrap-break-word"
            >
              {goal}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-text-sec">No Goals Specified</p>
      )}
    </div>
  );
}

function DesiredFundingField({ editing, value }) {
  const min = value?.min ?? "";
  const max = value?.max ?? "";

  const none = min == "" && max == "";
  const minLabel = min !== "" ? `Min: $${min || "0"}` : "Min: Not Specified";
  const maxLabel = max !== "" ? `Max: $${max || "∞"}` : "Max: Not Specified";

  return (
    <div>
      {editing ? (
        <div>
          <p className="text-text-pri/80">Desired Funding Amount ($)</p>
          <div className="mt-1 flex items-center gap-2">
            <input
              name="desired_funding_min"
              defaultValue={min}
              inputMode="numeric"
              pattern="[0-9]*"
              className="w-28 rounded-md border text-sm border-search bg-mainbg px-3 py-2"
            />
            <span className="text-text-sec">to</span>
            <input
              name="desired_funding_max"
              defaultValue={max}
              inputMode="numeric"
              pattern="[0-9]*"
              className="w-28 rounded-md border text-sm border-search bg-mainbg px-3 py-2"
            />
          </div>
        </div>
      ) : (
        <div>
          <p className="text-text-pri/80">Desired Funding Amount ($)</p>
          {none ? (
            <p className="text-text-sec">Not Specified</p>
          ) : (
            <div className=" flex gap-4">
              <p className="text-text-sec">{minLabel}</p>
              <p className="text-text-sec">{maxLabel}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CollaborationField({ editing, value }) {
  const isYes = value === true || value == "true";

  return (
    <div>
      <p className="text-text-pri/80 ">Interested in Collaboration</p>
      <div className="flex items-center gap-4">
        <p className="text-text-sec">
          Are you open to collaborative research opportunities?
        </p>

        {!editing ? (
          <span
            className={`px-3 py-1 text-sm rounded-full ${
              isYes ? "bg-blue-700 text-text-pri" : "bg-search/70 text-inwhite"
            }`}
          >
            {isYes ? "Yes" : "No"}
          </span>
        ) : (
          <select
            name="collaboration_interest"
            defaultValue={isYes ? "true" : "false"}
            className="w-24 rounded-md border text-sm border-search bg-mainbg px-2 py-1"
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        )}
      </div>
    </div>
  );
}
