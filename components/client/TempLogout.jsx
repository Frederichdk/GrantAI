"use client";

import Link from "next/link";
import { FiLogOut } from "react-icons/fi";

export default function Logout() {
  function handleLogout() {
    localStorage.removeItem("user");
  }

  return (
    <Link href="/signup" onClick={handleLogout}>
      <button
        className="p-2 rounded-md  
                    text-neutral-300 
                   hover:text-white 
                   transition-all duration-150 
                   active:scale-[0.97] shadow-sm hover:shadow-md
                   focus:outline-none focus:ring-2 focus:ring-neutral-500 
                   focus:ring-offset-2 focus:ring-offset-neutral-900"
        title="Log out"
      >
        <FiLogOut size={20} />
      </button>
    </Link>
  );
}
