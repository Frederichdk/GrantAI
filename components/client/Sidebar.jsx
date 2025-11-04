"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { LuUser } from "react-icons/lu";
import { RiHome6Line } from "react-icons/ri";
import { BsLayoutSidebar } from "react-icons/bs";

export default function Sidebar() {
  const pathname = usePathname();
  const nav = [
    { href: "/", icon: RiHome6Line, label: "Dashboard" },
    { href: "/profile", icon: LuUser, label: "Profile" },
  ];

  const [expanded, setExpanded] = useState(false);
  const width = expanded ? "w-64" : "w-16";

  return (
    <aside
      className={`${width} h-full border-r border-neutral-800 bg-neutral-900 transition-all`}
      aria-label="Primary"
    >
      <div
        className={`h-20 flex items-center justify-between transition-[padding] duration-300 ease-in-out  ${
          expanded ? "px-4" : "pr-2.5"
        }`}
      >
        <span
          className={`block w-fit truncate transition-opacity duration-200  ${
            expanded ? "opacity-100" : "opacity-0"
          }`}
        >
          Navigation
        </span>

        <button
          onClick={() => setExpanded((x) => !x)}
          className="p-3  rounded-md  hover:bg-neutral-800/70"
          title={expanded ? "Collapse" : "Expand"}
        >
          <BsLayoutSidebar size={20} />
        </button>
      </div>

      <nav className="px-2 py-3 flex flex-col gap-1">
        {nav.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              title={!expanded ? label : undefined}
              aria-current={active ? "page" : undefined}
              className={`group grid items-center rounded-lg transition ${
                active
                  ? "bg-neutral-800 text-text-pri"
                  : "text-text-sec hover:text-white hover:bg-neutral-800/70"
              } ${expanded ? "grid-cols-[24px_1fr]" : "grid-cols-[24px_0fr]"}
                   px-3 py-3 gap-3
                  transition-[grid-template-columns]`}
            >
              <span className="shrink-0 w-5 h-5 grid place-items-center">
                <Icon size={20} />
              </span>

              <span className="overflow-hidden whitespace-nowrap">{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
