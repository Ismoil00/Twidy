import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { FaChevronLeft } from "react-icons/fa";
import SidebarListItems from "./sidebarItem";

export default function Sidebar() {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <>
      {/* LAPTOP + PC VERSIONS */}
      <div className="hidden sm:block w-44 bg-brand_gray">
        <SidebarListItems />
      </div>

      {/* MOBILE VERSION */}
      <div
        className={`block sm:hidden w-44 h-screen fixed z-50 ${
          open
            ? "animate-openSidebarIconAnimation"
            : "animate-closeSidebarIconAnimation"
        }`}
      >
        <IoMenu
          onClick={() => setOpen(true)}
          className={`${
            open ? "hidden" : "block"
          } absolute top-1 right-1 z-10 size-8 text-brand_blue cursor-pointer`}
        />
        <FaChevronLeft
          onClick={() => setOpen(false)}
          className={`${
            open ? "block" : "hidden"
          } absolute top-2 right-2 z-10 size-6 text-brand_text_secondary cursor-pointer`}
        />
        <div
          className={`bg-brand_gray shadow-xl pb-10 absolute w-full h-full ${
            open
              ? "animate-openSidebarAnimation"
              : "animate-closeSidebarAnimation"
          }`}
        >
          <SidebarListItems />
        </div>
      </div>
    </>
  );
}
