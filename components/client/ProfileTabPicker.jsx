"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const TABS = [
  { key: "basic", label: "Basic Details" },
  { key: "interests", label: "Interests" },
  { key: "articles", label: "Published Articles" },
];

export default function ProfileTabPicker({ activeKey }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  function onSelect(key) {
    const sp = new URLSearchParams(params);
    sp.set("tab", key);
    router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
  }

  return (
    <div
      role="tablist"
      className="flex gap-2 rounded-md border border-neutral-800 bg-black-fore p-1"
    >
      {TABS.map(({ key, label }) => {
        const isActive = key === activeKey;
        return (
          <button
            key={key}
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${key}`}
            onClick={() => onSelect(key)}
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
            <span className="relative z-10">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
