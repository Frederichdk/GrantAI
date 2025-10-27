"use client";

import { useState } from "react";
import { LuPaperclip } from "react-icons/lu";
import { LuSend } from "react-icons/lu";
import { PiMicrophoneLight } from "react-icons/pi";

export default function DashSearchBar() {
  const [query, setQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Search sent");
  }

  function handleChange(e) {
    setQuery(e.target.value);
  }

  return (
    <div className="flex justify-center w-full text-3xl font-bold mb-6">
      <div className="flex items-center h-16 w-full gap-4 justify-center">
        <IconButton>
          <LuPaperclip size={18} />
        </IconButton>

        <form
          id="dash-search-form"
          onSubmit={handleSubmit}
          className="flex items-center w-3/5 h-16 rounded-full bg-search px-4 gap-2"
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
        </form>

        <IconButton>
          <LuSend size={18} />
        </IconButton>
      </div>
    </div>
  );
}

function IconButton({ children, hover = true, onClick }) {
  return (
    <button
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
