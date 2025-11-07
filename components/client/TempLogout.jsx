"use client";

import { FiLogOut } from "react-icons/fi";
import { logoutAction } from "@/app/actions/userActions";

export default function Logout() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="p-2 rounded-md  
                   text-inwhite 
                   hover:text-text-pri 
                   transition-all duration-150 
                   active:scale-[0.97] shadow-sm hover:shadow-md
                   "
        title="Log out"
      >
        <FiLogOut size={20} />
      </button>
    </form>
  );
}
