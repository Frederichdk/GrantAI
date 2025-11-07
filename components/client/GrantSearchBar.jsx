"use client";

import { useState } from "react";
import { LuPaperclip } from "react-icons/lu";
import { LuSend } from "react-icons/lu";
import { PiMicrophoneLight } from "react-icons/pi";

export default function GrantSearchBar() {
  const [query, setQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Search sent");
  }

  function handleChange(e) {
    setQuery(e.target.value);
  }

  return (
    <div className="flex justify-center w-full text-3xl font-bold ">
      <div className="flex items-center h-14 w-full px-4 gap-4 justify-center">
        <IconButton>
          <LuPaperclip size={18} />
        </IconButton>

        <form
          id="grant-search-form"
          onSubmit={handleSubmit}
          className="flex items-center flex-1 h-14 rounded-full bg-search px-4 gap-2"
        >
          <input
            value={query}
            onChange={handleChange}
            placeholder="Ask me anything about grants..."
            className="flex-1 outline-none bg-transparent pl-4 text-sm font-normal text-text-pri placeholder:text-text-sec"
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
        hover && "hover:bg-mgrey",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </button>
  );
}
