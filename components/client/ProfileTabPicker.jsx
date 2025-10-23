"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const TABS = ["Basic Details", "Interests", "Published Articles"];

export default function ProfileTabPicker() {
  const [active, setActive] = useState(TABS[0]);

  return (
    <>
      <div
        role="tablist"
        className="flex gap-2 rounded-md border border-neutral-800 bg-black-fore p-1"
      >
        {TABS.map((tab) => {
          const isActive = tab === active;
          return (
            <button
              key={tab}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab}`}
              onClick={() => setActive(tab)}
              className={`relative px-4 py-2 rounded-sm text-sm transition flex-1
                ${
                  isActive
                    ? "text-white"
                    : "text-neutral-300 hover:bg-neutral-700/40 hover:text-white"
                }`}
            >
              {isActive && (
                <motion.span
                  layoutId="tabHighlight"
                  className="absolute inset-0 rounded-sm bg-search"
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          );
        })}
      </div>

      <h2 className="mt-6 text-lg text-neutral-300">{active}</h2>
    </>
  );
}
