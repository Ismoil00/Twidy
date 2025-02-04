import { useState } from "react";
import { Link } from "react-router-dom";
import { SidebarMenuItem, renderSidebar } from "../../data/sidebar";

export default function SidebarListItems() {
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
}
