import AuthGate from "@/components/client/AuthGate";
import Logout from "@/components/client/TempLogout";
import Link from "next/link";
import { GoPerson } from "react-icons/go";

export default function DashboardPage() {
  return (
    <AuthGate>
      <div className="w-screen h-screen">
        <div className="h-[15%] mx-auto p-6 flex justify-between">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
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
        <div className="w-full h-[25%]  p-6">
          <h1 className="text-3xl font-bold mb-6">Search bar</h1>
        </div>
        <div className="h-[60%] p-6">
          <h1 className="text-3xl font-bold mb-6">Grant Recomendations</h1>
        </div>
      </div>
    </AuthGate>
  );
}
