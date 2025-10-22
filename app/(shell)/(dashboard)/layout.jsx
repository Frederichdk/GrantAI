import Link from "next/link";
import { GoPerson } from "react-icons/go";
import Logout from "@/components/client/TempLogout";

export default function DashboardLayout({ children }) {
  return (
    <div className="h-full flex flex-col ">
      <header className="h-1/8 ">
        <div className="mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Name and Picture</h1>
        </div>
      </header>
      <main className="flex-1">
        <div className="h-full">{children}</div>
      </main>
    </div>
  );
}
