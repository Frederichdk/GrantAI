import { TbDotsVertical } from "react-icons/tb";
import { BsStars } from "react-icons/bs";
import GrantSearchBar from "@/components/client/GrantSearchBar";

export default function GrantLayout({ children }) {
  return (
    <div className="w-full h-full p-6 flex flex-row gap-8 ">
      {/* Left side which is the chat  */}
      <div className="flex-1 flex flex-col ">
        <div className="w-full h-16 px-6 flex flex-row justify-between items-center bg-hover">
          <div className="flex flex-row gap-2 items-center">
            <BsStars size={26} className="text-text-sec" />
            <h2 className="text-xl text-text-pri/80">Grant Search Session</h2>
          </div>
          <div className="w-10 h-10 flex justify-center items-center rounded-xl text-text-sec  hover:bg-mgrey hover:text-text-pri">
            <TbDotsVertical size={16} />
          </div>
        </div>
        <div className="w-full flex-1 flex flex-col bg-hover">
          <div className="w-full flex-1 "></div>
          <div className="w-full h-22 flex justify-center items-center">
            <GrantSearchBar />
          </div>
        </div>
      </div>

      {/* Right side which is the grant details */}
      <div className="flex-2 flex flex-col">{children}</div>
    </div>
  );
}
