"use client";

import { useState } from "react";
import { LuUser } from "react-icons/lu";

export default function CollaboratorsList({ collaborators = [] }) {
  const [selected, setSelected] = useState(() => new Set());

  const isSelected = (id) => selected.has(id);
  const toggle = (id) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <ul className="max-h-[35vh] overflow-y-auto custom-scroll p-2 space-y-1">
      {collaborators.map((c) => {
        const active = isSelected(c.id);
        return (
          <li key={c.id}>
            <div
              role="button"
              tabIndex={0}
              onClick={() => toggle(c.id)}
              className={[
                "group flex items-start gap-6 rounded-2xl p-4",
                "border transition shadow-sm",
                active
                  ? "border-white/25 bg-neutral-800/60"
                  : "border-neutral-800 bg-neutral-900/30 hover:bg-neutral-900/50 hover:border-neutral-700",
                "focus:outline-none focus:ring-2 focus:ring-white/10",
              ].join(" ")}
            >
              <input
                type="checkbox"
                className="mt-1 accent-blue-700/70 pointer-events-none"
                checked={active}
                readOnly
              />

              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center ring-1 ring-neutral-700/60">
                    <LuUser className="text-text-sec" size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-text-pri/80">{c.name}</span>
                    <span className="text-xs text-text-sec">{c.country}</span>
                  </div>
                </div>

                {c.bio && (
                  <p className="mt-2 text-xs text-text-sec leading-relaxed">
                    {c.bio}
                  </p>
                )}

                {c.tags?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {c.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-1 rounded-md border border-neutral-800 bg-neutral-800/40 text-text-sec whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
