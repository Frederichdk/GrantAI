"use client";

import { FiLogOut } from "react-icons/fi";
import { logoutAction } from "@/app/actions/userActions";

export default function Logout() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="p-2 rounded-md  
                   text-text-sec 
                   hover:text-text-pri 
                   transition-all duration-150 "
        title="Log out"
      >
        <FiLogOut size={20} />
      </button>
    </form>
  );
}
