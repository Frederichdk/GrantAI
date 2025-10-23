"use client";
import { usePathname } from "next/navigation";

function DashboardHeader() {
  return (
    <div>
      <h1 className="text-3xl">Hello, Frederich de Koker</h1>
      <h2 className="text-text-pri/50">How can I help?</h2>
    </div>
  );
}

function ProfileHeader() {
  return (
    <div className="flex items-center gap-3">
      <div className="size-20 rounded-full bg-neutral-700" />
      <div>
        <h1 className="text-3xl">Frederich de Koker</h1>
        <h2 className="text-text-pri/50">fwdekoker@jahnelgroup.com</h2>
      </div>
    </div>
  );
}

export default function HeaderSwitch() {
  const pathname = usePathname();
  const isProfile = pathname === "/profile" || pathname.startsWith("/profile/");
  return isProfile ? <ProfileHeader /> : <DashboardHeader />;
}
