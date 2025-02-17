import { useState } from "react";
import SearchBar from "../../../components/searchBar";
import Button from "../../../components/button";
import Chats from "./chats";

export default function ChatList() {
  const [searchedText, setSearchedText] = useState<string>("");

  console.log(searchedText);

  return (
    <div className="w-[450px]">
      <div className="mt-5 mb-4">
        <SearchBar
          searchedText={searchedText}
          setSearchedText={setSearchedText}
        />
      </div>

      <section className="flex gap-1 justify-between mb-4">
        <Button text="Select" onClick={() => {}} tailwindUtilities="!px-0" />
        <Button text="Archive" onClick={() => {}} tailwindUtilities="!px-0" />
        <Button text="Delete" onClick={() => {}} tailwindUtilities="!px-0" />
      </section>

      <Chats />
    </div>
  );
}
