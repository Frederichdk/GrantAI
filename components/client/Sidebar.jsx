"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { LuUser, LuSearch, LuBookOpen, LuFolderOpen } from "react-icons/lu";
import { RiHome6Line } from "react-icons/ri";
import { BsLayoutSidebar } from "react-icons/bs";

export default function Sidebar() {
  const pathname = usePathname();
  const nav = [
    { href: "/", icon: RiHome6Line, label: "Dashboard" },
    { href: "/profile", icon: LuUser, label: "Profile" },
    { href: "/search", icon: LuSearch, label: "Grant Search" },
    { href: "/grants/123", icon: LuBookOpen, label: "Recommendations" },
    { href: "/proposal/123", icon: LuFolderOpen, label: "Proposals" },
  ];

  const [expanded, setExpanded] = useState(false);
  const width = expanded ? "w-64" : "w-16";

  return (
    <aside
      className={`${width} h-full border-r border-neutral-800 bg-neutral-900 transition-all`}
      aria-label="Primary"
    >
      <div className="h-20 px-3  flex items-center justify-between">
        <span className={expanded ? "font-semibold" : "sr-only"}>
          Navigation
        </span>
        <button
          onClick={() => setExpanded((x) => !x)}
          className="p-2 rounded-md hover:bg-neutral-800/70"
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          title={expanded ? "Collapse" : "Expand"}
        >
          <BsLayoutSidebar size={18} />
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
              className={`group flex items-center rounded-lg transition focus:outline-none focus:ring-2 focus:ring-neutral-600
                ${
                  active
                    ? "bg-neutral-800 text-text-pri"
                    : "text-text-sec hover:text-white hover:bg-neutral-800/70"
                } ${
                expanded ? "px-3 gap-3 py-3" : "px-0 gap-0 py-3 justify-center"
              }`}
            >
              <span className="shrink-0 w-5 h-5 grid place-items-center">
                {Icon ? (
                  <Icon size={20} />
                ) : (
                  <span className="inline-block w-5 h-5" />
                )}
              </span>

              {expanded && (
                <span className="whitespace-nowrap transition-[opacity,transform] opacity-100 translate-x-0">
                  {label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
