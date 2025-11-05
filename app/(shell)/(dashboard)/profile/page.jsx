import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserByOrcid } from "@/lib/dal";
import ProfileTabPicker from "@/components/client/ProfileTabPicker";
import ProfileBasicDetails from "@/components/client/ProfileBasicDetails";
import ProfileInterests from "@/components/client/ProfileInterests";
import ProfileArticles from "@/components/client/ProfileArticles";

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
      <div className="p-6 border-t-2  border-neutral-800">
        <ProfileTabPicker activeKey={activeKey} />
      </div>

      <section>
        {activeKey === "basic" && (
          <ProfileBasicDetails user={user} activeLabel={activeLabel} />
        )}
        {activeKey === "interests" && (
          <ProfileInterests user={user} activeLabel={activeLabel} />
        )}
        {activeKey === "articles" && (
          <ProfileArticles user={user} activeLabel={activeLabel} />
        )}
      </section>
    </div>
  );
}

function PublishedArticles() {
  return (
    <div className="flex flex-col gap-4 px-2">
      <div className="rounded-lg border border-neutral-800 p-6 bg-neutral-800/70">
        <h3 className="text-text-pri font-semibold">Paper Titles</h3>
        <div className="grid grid-cols-2 gap-y-4 text-sm pt-6">
          <div>
            <p className="text-text-sec">No paper titles found</p>
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-neutral-800 p-6 bg-neutral-800/70">
        <h3 className="text-text-pri font-semibold">Paper Abstracts</h3>
        <div className="grid grid-cols-2 gap-y-4 text-sm pt-6">
          <div>
            <p className="text-text-sec">No paper abstracts found</p>
          </div>
        </div>
      </div>
    </div>
  );
}
