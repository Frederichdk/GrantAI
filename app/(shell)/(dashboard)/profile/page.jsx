import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserByOrcid } from "@/lib/dal";
import ProfileTabPicker from "@/components/client/ProfileTabPicker";
import ProfileBasicDetails from "@/components/client/ProfileBasicDetails";

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
        {activeKey === "interests" && <Interests user={user} />}
        {activeKey === "articles" && <PublishedArticles user={user} />}
      </section>
    </div>
  );
}

function Interests({ user }) {
  return (
    <div className="max-h-[60vh] overflow-y-auto px-2 min-h-0 overscroll-contain custom-scroll">
      <div className="flex flex-col gap-4">
        <div className="rounded-lg border border-neutral-800 p-6 bg-neutral-800/70">
          <h3 className="text-text-pri font-semibold">Research Fields</h3>
          <div className="grid grid-cols-1 gap-y-4 text-sm pt-6">
            <div>
              <p className="text-text-pri">Primary Research Field</p>
              <p className="text-text-sec">
                {user?.grant_search_preferences.primary_research_field || "—"}
              </p>
            </div>
            <div>
              <p className="text-text-pri">Secondary Research Field</p>
              <p className="text-text-sec">
                {user?.grant_search_preferences.secondary_research_field || "—"}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-neutral-800 p-6 bg-neutral-800/70">
          <h3 className="text-text-pri font-semibold">
            Research Keywords or Goals
          </h3>
          <div className="grid grid-cols-1 gap-y-4 text-sm pt-6">
            <p className="text-text-sec">No research keywords specified</p>
          </div>
        </div>

        <div className="rounded-lg border border-neutral-800 p-6 bg-neutral-800/70">
          <h3 className="text-text-pri font-semibold">Grant Preferences</h3>
          <div className="grid grid-cols-2 gap-y-4 text-sm pt-6">
            <div>
              <p className="text-text-pri">Desired Funding Amount ($)</p>
              <p className="text-text-sec">Not specified</p>
            </div>
            <div>
              <p className="text-text-pri">Project Duration (years)</p>
              <p className="text-text-sec">Not specified</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-neutral-800 p-6 bg-neutral-800/70">
          <h3 className="text-text-pri font-semibold">Collaboration</h3>
          <div className="grid grid-cols-1 gap-y-4 text-sm pt-6">
            <div>
              <p className="text-text-pri">Interested in Collaboration</p>
              <p className="text-text-sec">
                Are you open to collaborative research opportunities?
              </p>
            </div>
          </div>
        </div>
      </div>
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
