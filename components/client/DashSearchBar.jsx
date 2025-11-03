"use client";

import { useState } from "react";
import { LuPaperclip } from "react-icons/lu";
import { LuSend } from "react-icons/lu";
import { PiMicrophoneLight } from "react-icons/pi";
import { useRouter } from "next/navigation";

export default function DashSearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // temporary
    if (query.trim()) {
      router.push(`/grants/search?query=${encodeURIComponent(query)}`);
    } else {
      router.push("/grants/search");
    }
  }

  function handleChange(e) {
    setQuery(e.target.value);
  }

  return (
    <div className="flex justify-center w-full text-3xl font-bold mb-6">
      <div className="flex items-center h-14 w-full gap-4 justify-center">
        <IconButton>
          <LuPaperclip size={18} />
        </IconButton>

        <form
          id="dash-search-form"
          onSubmit={handleSubmit}
          className="flex items-center w-3/5 h-14 rounded-full bg-search px-4 gap-2"
        >
          <input
            value={query}
            onChange={handleChange}
            placeholder="Search for Grants"
            className="flex-1 outline-none bg-transparent pl-8 text-lg font-normal text-text-pri placeholder:text-text-sec"
          />
          <IconButton hover={false}>
            <PiMicrophoneLight size={20} />
          </IconButton>

          <IconButton type="submit">
            <LuSend size={18} />
          </IconButton>
        </form>
      </div>
    </div>
  );
}

function IconButton({ children, hover = true, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={[
        "text-text-sec w-10 h-10 flex justify-center items-center rounded-xl hover:text-text-pri",
        hover && "hover:bg-neutral-800/70",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </button>
  );
}
