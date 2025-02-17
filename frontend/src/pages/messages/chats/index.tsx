import { useState } from "react";
import SearchBar from "../../../components/searchBar";
import Chats from "./chats";

const filters = [
  {
    id: "select",
    name: "Select",
  },
  {
    id: "archive",
    name: "Archive",
  },
  {
    id: "delete",
    name: "Delete",
  },
];

export default function ChatList() {
  const [searchedText, setSearchedText] = useState<string>("");
  const [filter, setFilter] = useState("select");

  return (
    <div className="xl:w-[450px]">
      <div className="hidden md:block mt-5 mb-4">
        <SearchBar
          searchedText={searchedText}
          setSearchedText={setSearchedText}
        />
      </div>

      <section className="hidden md:flex gap-4 mb-4">
        {filters.map((fl) => (
          <p
            onClick={() => setFilter(fl.id)}
            className={`text-brand_text_primary cursor-pointer ${
              filter === fl.id ? "font-700 underline" : ""
            }`}
          >
            {fl.name}
          </p>
        ))}
      </section>

      <Chats />
    </div>
  );
}
