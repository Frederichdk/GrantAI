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
      <div className="p-6 border-t-2  border-lgrey">
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
