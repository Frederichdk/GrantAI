import HeaderSwitch from "@/components/client/HeaderSwitch";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserByOrcid } from "@/lib/dal";

export default async function DashboardLayout({ children }) {
  const cookieStore = await cookies();
  const orcid = cookieStore.get("orcid")?.value;
  if (!orcid) redirect("/signup");

  const user = await getUserByOrcid(orcid);
  if (!user) redirect("/signup");

  return (
    <div className="h-full flex flex-col shrink-0 overflow-hidden">
      <header className="h-1/9 pl-16 flex items-start">
        <HeaderSwitch user={user} />
      </header>
      <main className="flex-1">
        <div className="h-full">{children}</div>
      </main>
    </div>
  );
}
