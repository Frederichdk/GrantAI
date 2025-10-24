"use client";

import { FiLogOut } from "react-icons/fi";
import { logoutAction } from "@/app/actions/userActions";

export default function Logout() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
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
    </form>
  );
}
