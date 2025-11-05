"use client";
import { useState } from "react";
import { updateProfileAction } from "@/app/actions/userActions";

export default function ProfileBasicDetails({ user, activeLabel }) {
  const [editing, setEditing] = useState(false);
  const gsp = user.grant_search_preferences || {};

  return (
    <form action={updateProfileAction} className="flex flex-col gap-4">
      <input type="hidden" name="orcid" value={user.orcid} />
      <input type="hidden" name="tab" value="basic" />
      <div className="flex w-full justify-between items-center px-6 pb-4 border-b-2 border-neutral-800/70  h-14">
        <h2 className="text-lg text-text-pri/90 font-semibold">
          {activeLabel}
        </h2>
        {!editing ? (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="px-3 py-1.5 text-sm rounded-md border border-neutral-700 hover:bg-neutral-800/60"
          >
            Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="px-3 py-1.5 text-sm rounded-md border border-neutral-700 hover:bg-neutral-800/60"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 text-sm rounded-md bg-indigo-600 hover:bg-indigo-500 text-white"
            >
              Save
            </button>
          </div>
        )}
      </div>
      <div className="px-6 flex flex-col gap-4">
        <div className="rounded-lg border border-neutral-800 p-6 bg-neutral-800/70">
          <h3 className="text-text-pri/80 font-semibold">
            Personal Information
          </h3>
          <div className="grid grid-cols-2 gap-y-4 text-sm pt-6">
            <Field
              label="Full Name"
              name="name"
              value={user.name}
              editing={editing}
            />
            <Field
              label="Email Address"
              name="email"
              value={user.email}
              editing={editing}
            />
            <Field
              label="Location"
              name="location"
              value={gsp.location}
              editing={editing}
            />
          </div>
        </div>

        <div className="rounded-lg border border-neutral-800 p-6 bg-neutral-800/70">
          <h3 className="text-text-pri/80 font-semibold">
            Academic Information
          </h3>
          <div className="grid grid-cols-2 gap-y-4 text-sm pt-6">
            <Field
              label="Institution/University"
              name="university"
              value={user.institution}
              editing={editing}
            />
            <ReadOnly label="ORCID iD" value={user.orcid} />
            <Field
              label="Degrees (comma-separated)"
              name="degrees"
              value={(gsp.degrees || []).join(", ")}
              editing={editing}
            />
            <Field
              label="Years Since Degree"
              name="years"
              value={gsp.years_since_degree}
              editing={editing}
            />
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
          className="w-1/2 rounded-md border text-sm border-neutral-700 bg-neutral-900 px-3 py-2"
          data-1p-ignore="true" //Raging
        />
      ) : (
        <p className="text-text-sec">{value || "—"}</p>
      )}
    </div>
  );
}

function ReadOnly({ label, value }) {
  return (
    <div>
      <p className="text-text-pri/80">{label}</p>
      <p className="text-text-sec">{value || "—"}</p>
    </div>
  );
}
