"use client";
import Link from "next/link";
import { FaRegFileAlt } from "react-icons/fa";

export default function ApplicationButton({ id, from }) {
  const href = from
    ? { pathname: `/grants/${id}/proposal`, query: { from } }
    : `/grants/${id}/proposal`;
  return (
    <Link href={href}>
      <button className="h-8 p-3 rounded-lg text-sm text-white/70 bg-blue-700/70 flex items-center gap-2 hover:text-white hover:bg-blue-700">
        <FaRegFileAlt size={16} /> Start Application
      </button>
    </Link>
  );
}
