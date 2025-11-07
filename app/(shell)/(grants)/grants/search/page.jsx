import GrantBackButton from "@/components/client/GrantBackButton";
import { getGrants } from "@/lib/dal";
import GrantRecomendations from "@/components/client/GrantRecomendations";
import FiltersTrigger from "@/components/client/FiltersTrigger";

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const filters = {
    amountMin: params?.amountMin || "",
    amountMax: params?.amountMax || "",
    category: params?.category,
    funding: params?.funding,
    status: params?.status || "",
    eligibilityMin: params?.eligibilityMin || "",
    eligibilityMax: params?.eligibilityMax || "",
    sort: params?.sort || "relevance",
  };

  const grants = await getGrants(filters);

  return (
    <>
      <div className="w-full h-16 px-6 flex flex-row justify-between items-center bg-hover border-b-3 border-hover">
        <div className="flex flex-row gap-8 items-center">
          <GrantBackButton />
          <h2 className="text-xl text-text-pri/80">Grant Opportunities</h2>
        </div>
      </div>

      <div className="w-full flex-3 flex flex-col bg-hover">
        <div className="w-full h-24 px-10 flex items-center border-b-3 border-hover">
          <FiltersTrigger />
        </div>

        <div className="h-12 flex items-center px-10 border-b-3 border-hover">
          <p className="text-sm text-text-sec">
            Showing {grants.length} grants
          </p>
        </div>

        <div className="flex-1 p-6">
          <div className="w-full max-h-[55vh] overflow-y-auto custom-scroll">
            <GrantRecomendations grants={grants} />
          </div>
        </div>
      </div>
    </>
  );
}
