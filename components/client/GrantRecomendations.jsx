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
            className="group block rounded-lg border border-lgrey bg-hover px-5 py-4
                       hover:border-search hover:bg-lgrey/80 transition-colors outline-none
                       focus-visible:ring-2 focus-visible:ring-search/60"
          >
            <div className="flex items-start justify-between gap-3">
              <h4 className="text-base font-semibold text-blue-400 group-hover:text-blue-300">
                {g.title}
              </h4>
              {typeof g.score === "number" && (
                <span className="shrink-0 rounded-md bg-mainbg/80 px-2 py-1 text-xs text-inwhite border border-search">
                  Score {fmtScore(g.score)}
                </span>
              )}
            </div>

            <p className="mt-2 text-sm text-text-sec line-clamp-2">
              {g.description}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-text-sec">
              <span>{g.provider || "—"}</span>
              <Dot />
              <span>{fmtMoney(g.amount)}</span>
              <Dot />
              <span>Opened: {fmtDate(g.posted_date || g.release_date)}</span>
              <Dot />
              <span>Due: {fmtDate(g.deadline)}</span>
              <span className="ml-auto inline-flex items-center text-search/60 group-hover:text-inwhite">
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
  return <span className="mx-1 text-search/80">•</span>;
}
