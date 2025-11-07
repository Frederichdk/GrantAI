"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IoGlasses } from "react-icons/io5";
import { IoMoonSharp } from "react-icons/io5";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const current = mounted ? resolvedTheme || theme || "system" : "system";

  return (
    <button
      onClick={() => setTheme(current === "dark" ? "light" : "dark")}
      className="px-2 py-2 rounded-full hover:bg-lgrey"
    >
      {current === "dark" ? <IoGlasses size={20} /> : <IoMoonSharp size={20} />}
    </button>
  );
}
