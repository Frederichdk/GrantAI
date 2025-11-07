import DashSearchBar from "@/components/client/DashSearchBar";
import { getTopGrants } from "@/lib/dal";
import GrantRecommendations from "@/components/client/GrantRecomendations";

export default async function DashboardPage() {
  const grants = await getTopGrants(10);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 flex flex-row justify-center pb-6">
        <DashSearchBar />
      </div>

      <div className="flex-4 flex flex-col items-center pb-6 gap-2">
        <div className="w-7/10">
          <h3 className="text-lg text-inwhite font-semibold pb-4 px-6 border-b-2 border-lgrey">
            Grant Recommendations
          </h3>
          <p className="py-2 px-6 border-b-2 border-lgrey text-text-sec">
            {grants.length} grants found
          </p>
        </div>

        <div className="p-6 w-7/10 h-full max-h-[50vh] overflow-y-auto custom-scroll">
          <GrantRecommendations grants={grants} />
        </div>
      </div>
    </div>
  );
}
