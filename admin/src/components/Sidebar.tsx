import { MdMenu } from "react-icons/md";
import Menu from "./Menu";
import { useState } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState<boolean>(true);


  return (
    <div
      className={`relative top-0 grid h-screen
                ${
                  open ? "w-[20rem] px-5" : "w-[4rem] px-2"
                } grid-rows-[min-content_minmax(0,1fr)] gap-5
                 bg-gray-100 py-4 text-white shadow-lg duration-500 ease-in-out dark:bg-gray-800`}
    >
      <MdMenu
        className="absolute right-2 top-2.5 cursor-pointer text-5xl text-gray-300"
        onClick={() => setOpen((prev) => !prev)}
      />
      <Menu open={open} />
    </div>
  );
};

export default Sidebar;
