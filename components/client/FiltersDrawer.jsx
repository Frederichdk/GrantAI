"use client";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { applyFilters } from "@/app/actions/userActions";

export default function FiltersDrawer({ open, onClose }) {
  const sp = useSearchParams();
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement;
    panelRef.current?.focus();
    return () => prev?.focus?.();
  }, [open]);

  const get = (k) => sp.get(k) || "";
  const has = (k, v) => sp.getAll(k).includes(v);

  return (
    <div
      id="filters-drawer"
      role="dialog"
      className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
    >
      <button
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        ref={panelRef}
        tabIndex={-1}
        className={`absolute right-0 top-0 h-full w-[380px] max-w-[90vw] bg-lgrey border-l border-search shadow-2xl transition-transform duration-200 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-16 px-4 flex items-center justify-between border-b border-search">
          <div className="text-sm uppercase tracking-wide text-text-pri/60">
            Filters
          </div>
          <button
            onClick={onClose}
            className="rounded-md px-2 py-1 text-sm text-text-pri/70 hover:text-text-pri"
          >
            Close
          </button>
        </div>

        <form
          action={applyFilters}
          className="h-[calc(100%-4rem)] overflow-y-auto p-4 space-y-4"
        >
          <div className="space-y-1">
            <div className="text-xs text-text-pri/60">Grant Amount</div>
            <div className="grid grid-cols-2 gap-2">
              <input
                name="amountMin"
                type="number"
                placeholder="Min"
                defaultValue={get("amountMin")}
                className="rounded-md bg-mainbg/60 border border-search px-3 py-2 text-sm outline-none placeholder:text-text-sec appearance-none"
              />
              <input
                name="amountMax"
                type="number"
                placeholder="Max"
                defaultValue={get("amountMax")}
                className="rounded-md bg-mainbg/60 border border-search px-3 py-2 text-sm outline-none placeholder:text-text-sec appearance-none"
              />
            </div>
          </div>

          <fieldset className="space-y-2">
            <div className="text-xs text-text-pri/60">Opportunity Category</div>
            {["A", "B", "D"].map((c) => (
              <label
                key={c}
                className="flex items-center gap-2 text-sm text-text-pri/80"
              >
                <input
                  type="checkbox"
                  name="category"
                  value={c}
                  defaultChecked={has("category", c)}
                  className="accent-text-pri/70"
                />
                {c}
              </label>
            ))}
          </fieldset>

          <fieldset className="space-y-2">
            <div className="text-xs text-text-pri/60">Funding Category</div>
            {["E", "H", "S", "T"].map((f) => (
              <label
                key={f}
                className="flex items-center gap-2 text-sm text-text-pri/80"
              >
                <input
                  type="checkbox"
                  name="funding"
                  value={f}
                  defaultChecked={has("funding", f)}
                  className="accent-text-pri/70"
                />
                {f}
              </label>
            ))}
          </fieldset>

          <fieldset className="space-y-2">
            <div className="text-xs text-text-pri/60">Status</div>
            {["Open", "Closed"].map((s) => (
              <label
                key={s}
                className="flex items-center gap-2 text-sm text-text-pri/80"
              >
                <input
                  type="radio"
                  name="status"
                  value={s}
                  defaultChecked={get("status") === s}
                  className="accent-text-pri/70"
                />
                {s}
              </label>
            ))}
          </fieldset>

          <div className="space-y-1">
            <div className="text-xs text-text-pri/60">Eligibility range</div>
            <div className="grid grid-cols-2 gap-2">
              <input
                name="eligibilityMin"
                type="number"
                min={0}
                max={25}
                placeholder="Min"
                defaultValue={get("eligibilityMin")}
                className="rounded-md bg-mainbg/60 border border-search px-3 py-2 text-sm outline-none placeholder:text-text-sec"
              />
              <input
                name="eligibilityMax"
                type="number"
                min={0}
                max={25}
                placeholder="Max"
                defaultValue={get("eligibilityMax")}
                className="rounded-md bg-mainbg/60 border border-search px-3 py-2 text-sm outline-none placeholder:text-text-sec"
              />
            </div>
          </div>

          {/* Sort TO be moved later, Just gonna leave it here for now*/}
          <div className="space-y-1">
            <label className="text-xs text-text-pri/60" htmlFor="sort">
              Sort by
            </label>
            <select
              id="sort"
              name="sort"
              defaultValue={get("sort") || "relevance"}
              className="w-full rounded-md bg-lgrey border border-search px-3 py-2 text-sm outline-none text-text-pri/80"
            >
              <option value="relevance">Relevance</option>
              <option value="deadline">Application deadline</option>
              <option value="-amount">Amount (high → low)</option>
              <option value="amount">Amount (low → high)</option>
            </select>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <a
              href="/grants/search"
              className="text-sm underline text-text-pri/60 hover:text-text-pri"
            >
              Clear all
            </a>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md px-4 py-2 text-sm border border-search hover:bg-text-sec/20"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-search hover:bg-text-sec/50 px-4 py-2 text-sm"
              >
                Apply
              </button>
            </div>
          </div>
        </form>
      </aside>
    </div>
  );
}
