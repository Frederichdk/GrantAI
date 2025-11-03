"use client";
import Link from "next/link";
import { HiChevronRight } from "react-icons/hi";
import { usePathname, useSearchParams } from "next/navigation";

function fmtMoney(n) {
  if (n == null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}
function fmtDate(d) {
  if (!d) return "—";
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return "—";
  return dt.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function fmtScore(score) {
  if (!score) return "—";
  const scoreString = String(score);
  if (
    scoreString.includes(".") &&
    scoreString.substring(0, scoreString.indexOf(".")) == "0"
  ) {
    return Math.round(Number(scoreString * 100)).toString();
  }
  return Math.round(Number(score)).toString();
}

export default function GrantRecomendations({ grants }) {
  const pathname = usePathname();
  const sp = useSearchParams();
  const currentUrl = sp.toString() ? `${pathname}?${sp.toString()}` : pathname;
  return (
    <ul className="flex flex-col gap-3">
      {grants.map((g) => (
        <li key={g.id}>
          <Link
            href={{
              pathname: `/grants/${encodeURIComponent(g.id)}`,
              query: { from: currentUrl },
            }}
            className="group block rounded-lg border border-neutral-800 bg-neutral-800/70 px-5 py-4
                       hover:border-neutral-700 hover:bg-neutral-800/80 transition-colors outline-none
                       focus-visible:ring-2 focus-visible:ring-neutral-500"
          >
            <div className="flex items-start justify-between gap-3">
              <h4 className="text-base font-semibold text-blue-300 group-hover:text-blue-200">
                {g.title}
              </h4>
              {typeof g.score === "number" && (
                <span className="shrink-0 rounded-md bg-neutral-900/80 px-2 py-1 text-xs text-neutral-300 border border-neutral-700">
                  Score {fmtScore(g.score)}
                </span>
              )}
            </div>

            <p className="mt-2 text-sm text-text-sec line-clamp-2">
              {g.description}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-neutral-400">
              <span>{g.provider || "—"}</span>
              <Dot />
              <span>{fmtMoney(g.amount)}</span>
              <Dot />
              <span>Opened: {fmtDate(g.posted_date || g.release_date)}</span>
              <Dot />
              <span>Due: {fmtDate(g.deadline)}</span>
              <span className="ml-auto inline-flex items-center text-neutral-500 group-hover:text-neutral-300">
                <HiChevronRight aria-hidden="true" />
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Dot() {
  return <span className="mx-1 text-neutral-600">•</span>;
}
