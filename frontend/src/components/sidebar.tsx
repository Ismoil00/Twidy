import { useState } from "react";
import { Link } from "react-router-dom";
import { SidebarMenuItem, renderSidebar } from "../data/sidebar";
import { IoMenu } from "react-icons/io5";
import { FaChevronLeft } from "react-icons/fa";

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

const SidebarListItems = () => {
  const [active, setActive] = useState<string>("home");

  return (
    <ul className="w-full h-full flex flex-col gap-14 items-center pt-10">
      <Link to="/" onClick={() => setActive("home")}>
        <img src="assets/logo.svg" alt="website logo" className="w-20" />
      </Link>
      {renderSidebar(active).map((menu: SidebarMenuItem) => (
        <li
          key={menu.id}
          className="group/li"
          onClick={() => setActive(menu.id)}
        >
          <Link
            to={menu.path}
            className="flex flex-col items-center gap-2 text-brand_text_primary font-700"
          >
            {menu.icon}
            {menu.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};
