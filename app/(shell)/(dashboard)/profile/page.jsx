import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserByOrcid } from "@/lib/dal";
import ProfileTabPicker from "@/components/client/ProfileTabPicker";

const TABS = {
  basic: "Basic Details",
  interests: "Interests",
  articles: "Published Articles",
};

export default async function ProfileManagmentPage({ searchParams }) {
  const jar = await cookies();
  const orcid = jar.get("orcid")?.value;
  if (!orcid) redirect("/signup");

  const user = await getUserByOrcid(orcid);
  if (!user) redirect("/signup");

  const sp = await searchParams;
  const rawTab = sp?.tab;
  const tabKey = (
    Array.isArray(rawTab) ? rawTab[0] : rawTab || "basic"
  ).toLowerCase();
  const activeKey = TABS[tabKey] ? tabKey : "basic";
  const activeLabel = TABS[activeKey];

  return (
    <div className="flex flex-col w-full h-full">
      <div className="p-6 border-t-2 border-b-2 border-neutral-800">
        <ProfileTabPicker activeKey={activeKey} />
        <h2 className="mt-6 text-lg text-neutral-300">{activeLabel}</h2>
      </div>

      <section className="p-6">
        {activeKey === "basic" && <BasicDetails user={user} />}
        {activeKey === "interests" && <Interests user={user} />}
        {activeKey === "articles" && <PublishedArticles user={user} />}
      </section>
    </div>
  );
}

function BasicDetails({ user }) {
  return (
    <div className="rounded-lg border border-neutral-800 p-4 bg-neutral-700/40 text-neutral-300">
      <h3>Personal Information</h3>
    </div>
  );
}

function Interests({ user }) {
  return (
    <div className="rounded-lg border border-neutral-800 p-4 bg-neutral-700/40 text-neutral-300">
      <h3>Research Fields</h3>
    </div>
  );
}

function PublishedArticles() {
  return (
    <div className="rounded-lg border border-neutral-800 p-4 bg-neutral-700/40 text-neutral-300">
      <h3>No Published Articles yet</h3>
    </div>
  );
}
