import { getGrantByID } from "@/lib/dal";
import { notFound } from "next/navigation";
import GrantBackButton from "@/components/client/GrantBackButton";
import ApplicationButton from "@/components/client/ApplicationButton";

export default async function GrantDetailsPage({ params }) {
  const { id } = await params;
  const grant = await getGrantByID(id);
  if (!grant) notFound();

  return (
    <>
      <div className="w-full h-16 px-6 flex flex-row justify-between items-center bg-neutral-800/70 border-b-3 border-neutral-800">
        <div className="flex flex-row gap-8 items-center">
          <GrantBackButton />
          <h2 className="text-xl text-text-pri/80">{grant.title}</h2>
        </div>
        <ApplicationButton id={id} from={"/"} />
      </div>

      <div className="w-full flex-1 px-10 py-4 text-sm bg-neutral-800/70 grid grid-cols-2 items-center border-b-2 border-neutral-800">
        <div className="h-fit">
          <p className="text-text-pri/80">Provider</p>
          <p className="text-text-sec">{grant?.provider || "Unknown"}</p>
        </div>
        <div className="h-fit">
          <p className="text-text-pri/80">Amount</p>
          <p className="text-text-sec">
            {fmtMoney(grant?.amount) || "Unknown"}
          </p>
        </div>
        <div className="h-fit">
          <p className="text-text-pri/80">Application Deadline</p>
          <p className="text-text-sec">
            {fmtDate(grant?.deadline) || "Unknown"}
          </p>
        </div>
        <div className="h-fit">
          <p className="text-text-pri/80">Posted Date</p>
          <p className="text-text-sec">
            {fmtDate(grant?.posted_date) || "Unknown"}
          </p>
        </div>
        <div className="h-fit">
          <p className="text-text-pri/80">Opportunity Catagory</p>
          <p className="text-text-sec">
            {grant?.opportunity_category || "Unknown"}
          </p>
        </div>
        <div className="h-fit">
          <p className="text-text-pri/80">Funding Catagory</p>
          <p className="text-text-sec">
            {grant?.funding_category || "Unknown"}
          </p>
        </div>
      </div>
      <div className="w-full flex-4 p-6 bg-neutral-800/70">
        <div className="w-full h-[58vh] overflow-y-auto custom-scroll">
          <div className="w-full h-fit pb-6">
            <h3 className="text-text-pri/80 mb-2">Description</h3>
            <p className="text-text-sec">{grant.description}</p>
          </div>
          {grant?.eligibility && (
            <>
              <div className="border-t-2 border-neutral-800 py-4">
                <h3 className="text-text-pri/80 mb-2">Eligibility</h3>
                <p className="text-text-sec">{grant.eligibility}</p>
              </div>
              <div className=" py-4">
                <h3 className="text-text-pri/80 mb-2">
                  Additional Elidibility Information
                </h3>
                <p className="text-text-sec">
                  {grant.additional_eligibility_info}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function fmtMoney(n) {
  if (n == null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function fmtDate(d) {
  if (!d) return "—";
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return "—";
  return dt.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
