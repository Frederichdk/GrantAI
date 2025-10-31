import GrantBackButton from "@/components/client/GrantBackButton";
import ExportButton from "@/components/client/ExportButton";
import { getGrantByID } from "@/lib/dal";
import { notFound } from "next/navigation";
import ProposalForm from "@/components/client/ProposalForm";

export default async function ProposalPage({ params }) {
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
        <ExportButton />
      </div>
      <div className="w-full flex-1 flex flex-col p-8 bg-neutral-800/70">
        <div className="w-full flex-1 flex flex-col gap-8">
          <h3 className="text-xl text-text-pri/80">Background</h3>
          <div className="w-full h-2/3 rounded-2xl border-2 p-6 border-neutral-800">
            <ProposalForm />
          </div>
        </div>
        <div className="w-full flex-1 ">
          <h3 className="text-xl text-text-pri/80">Collaborators</h3>
        </div>
      </div>
    </>
  );
}
