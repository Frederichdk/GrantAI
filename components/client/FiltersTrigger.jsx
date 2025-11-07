"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LuFilter } from "react-icons/lu";
import FiltersDrawer from "./FiltersDrawer";

export default function FiltersTrigger() {
  const [open, setOpen] = useState(false);
  const sp = useSearchParams();

  const count = (() => {
    const len = (v) => (Array.isArray(v) ? v.length : v ? 1 : 0);
    return (
      len(sp.get("amountMin")) +
      len(sp.get("amountMax")) +
      sp.getAll("category").length +
      sp.getAll("funding").length +
      len(sp.get("eligibilityMin")) +
      len(sp.get("eligibilityMax")) +
      len(sp.get("status"))
    );
  })();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="h-10 p-4 rounded-sm text-sm text-text-pri/70 bg-lgrey/60 border border-search flex items-center gap-2 hover:text-text-pri hover:bg-search hover:border-search"
      >
        <LuFilter size={16} /> Filter
        {count > 0 && (
          <div className="text-md h-6 w-5 rounded-full flex justify-center items-center bg-blue-800">
            {count}
          </div>
        )}
      </button>

      <FiltersDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
