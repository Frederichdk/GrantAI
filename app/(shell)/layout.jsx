import Link from "next/link";
import { GoPerson } from "react-icons/go";
import Logout from "@/components/client/TempLogout";
import Sidebar from "@/components/client/Sidebar";

export default function ShellLayout({ children }) {
  return (
    <div className="h-screen w-screen flex flex-row">
      <Sidebar />
      <div className="flex flex-col w-full">
        <header className="h-1/12 ">
          <div className="mx-auto p-6 flex justify-between items-center">
            <h1 className="text-xl font-bold">Grant AI</h1>
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
    </div>
  );
}
