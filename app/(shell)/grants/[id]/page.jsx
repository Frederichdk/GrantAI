import { MdArrowBack } from "react-icons/md";
import { FaRegFileAlt } from "react-icons/fa";
import { getGrantByID } from "@/lib/dal";
import { notFound } from "next/navigation";

export default async function GrantDetailsPage({ params }) {
  const grant = await getGrantByID(params.id);
  if (!grant) notFound();

  return (
    <div className="w-full h-full p-6 flex flex-row gap-8 ">
      <div className="flex-1 p-4 "> Chat</div>

      <div className="flex-2 flex flex-col">
        <div className="w-full h-16 px-6 flex flex-row justify-between items-center bg-neutral-800/70 border-b-3 border-neutral-800">
          <div className="flex flex-row gap-8 items-center">
            <MdArrowBack
              size={20}
              className="text-text-sec hover:text-text-pri "
            />
            <h2 className="text-xl text-text-pri/80">{grant.title}</h2>
          </div>
          <button className="h-8 p-3 rounded-lg text-sm text-text-pri/70 bg-blue-700/70 flex items-center gap-2 hover:text-text-pri hover:bg-blue-700">
            <FaRegFileAlt size={16} /> Start Application
          </button>
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
            <div className="w-full h-fit">
              <h3 className="text-text-pri/80">Description</h3>
              <p className="text-text-sec">{grant.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
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
