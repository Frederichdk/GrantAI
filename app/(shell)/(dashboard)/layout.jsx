import Logout from "@/components/client/TempLogout";
import Link from "next/link";
import { GoPerson } from "react-icons/go";

export default function DashboardLayout({ children }) {
  return (
    <div className="h-screen flex flex-col">
      <header className="h-1/6 ">
        <div className="mx-auto p-6 flex justify-between">
          <h1 className="text-xl font-bold mb-6">Grant AI</h1>
          <div className="flex gap-2">
            <Logout />
            <Link href="/profile">
              <button
                className="p-2 rounded-md  
                text-neutral-300 
                hover:text-white 
                transition-all duration-150 
                active:scale-[0.97] shadow-sm hover:shadow-md
                focus:outline-none focus:ring-2 focus:ring-neutral-500 
                       focus:ring-offset-2 focus:ring-offset-neutral-900"
                title="Profile"
              >
                <GoPerson size={20} />
              </button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="h-full">{children}</div>
      </main>
    </div>
  );
}
