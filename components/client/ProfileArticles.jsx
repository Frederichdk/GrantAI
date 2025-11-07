export default function ProfileArticles({ user, activeLabel }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full justify-between items-center px-6 pb-4 border-b-2 border-neutral-800/70 h-14">
        <h2 className="text-lg text-text-pri/90 font-semibold">
          {activeLabel}
        </h2>
      </div>
      <div className="flex flex-col gap-4 px-6">
        <div className="rounded-lg border border-neutral-800 p-6 bg-neutral-800/70">
          <h3 className="text-text-pri/80 font-semibold">Paper Titles</h3>
          <div className="grid grid-cols-2 gap-y-4 text-sm pt-6">
            <div>
              <p className="text-text-sec">No paper titles found</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-neutral-800 p-6 bg-neutral-800/70">
          <h3 className="text-text-pri/80 font-semibold">Paper Abstracts</h3>
          <div className="grid grid-cols-2 gap-y-4 text-sm pt-6">
            <div>
              <p className="text-text-sec">No paper abstracts found</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
