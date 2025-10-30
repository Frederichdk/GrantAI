"use client";
import { MdArrowBack } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";

export default function GrantBackButton({ fallback = "/" }) {
  const router = useRouter();
  const sp = useSearchParams();
  const from = sp.get("from");

  const handleBack = () => {
    if (!from) return router.push(fallback);
    router.push(from);
  };

  return (
    <button
      className="flex justify-center items-center w-10 h-10 rounded-xl text-text-sec hover:bg-neutral-700/40 hover:text-text-pri"
      onClick={handleBack}
    >
      <MdArrowBack size={20} />
    </button>
  );
}
