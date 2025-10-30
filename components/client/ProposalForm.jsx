"use client";
import { BsStars } from "react-icons/bs";
import { useState } from "react";

export default function ProposalForm() {
  const [query, setQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log("t");
  }

  function handleChange(e) {
    setQuery(e.target.value);
  }
  return (
    <form
      id="grant-search-form"
      onSubmit={handleSubmit}
      className="flex flex-col h-full gap-4 rounded-xl"
    >
      <textarea
        value={query}
        onChange={handleChange}
        placeholder="Enter background information for the grant application..."
        className="flex-1 w-full resize-none overflow-y-auto rounded-md bg-neutral-700/40 p-4 text-sm font-normal text-text-pri/80 placeholder:text-text-sec outline-none custom-scroll"
      />
      <button
        type="submit"
        className="h-8 w-fit p-3 rounded-md text-sm text-text-pri/70 bg-blue-700/70 flex items-center gap-2 hover:text-text-pri hover:bg-blue-700"
      >
        <BsStars size={20} />
        Save
      </button>
    </form>
  );
}
