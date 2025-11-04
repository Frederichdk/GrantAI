"use client";
import { usePathname } from "next/navigation";

function DashboardHeader({ user }) {
  return (
    <div>
      <h1 className="text-3xl">Hello, {user.name || "Researcher"}</h1>
      <h2 className="text-text-pri/50">How can I help?</h2>
    </div>
  );
}

function ProfileHeader({ user }) {
  return (
    <div className="flex items-center gap-3">
      <div className="size-20 rounded-full bg-neutral-700" />
      <div>
        <h1 className="text-3xl">{user.name || "Researcher"}</h1>
        <h2 className="text-text-pri/50">{user.email || "—"}</h2>
      </div>
    </div>
  );
}

export default function HeaderSwitch({ user }) {
  const pathname = usePathname();
  const isProfile = pathname === "/profile" || pathname.startsWith("/profile/");
  return isProfile ? (
    <ProfileHeader user={user} />
  ) : (
    <DashboardHeader user={user} />
  );
}
