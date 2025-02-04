import Logout from "../../components/logout";
import Input from "../../components/input";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";

/* HOMEPAGE HEADER */
export default function Header() {
  const [searchedText, setSearchedText] = useState<string>("");

  const handleSearch = () => {
    console.log(searchedText);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedText(event.target.value);
  };

  return (
    <div>
      <div className="searchBar relative">
        <IoIosSearch
          onClick={handleSearch}
          className={`text-brand_text_secondary size-8 absolute top-0 left-0 translate-y-[35%] translate-x-2 cursor-pointer hover:text-brand_text_primary transition duration-200 active:scale-[1.05]`}
        />
        <Input
          name="searchBar"
          onChange={handleInputChange}
          placeholder="Search by name and category"
          type="text"
          value={searchedText}
          inputTailwindUtilities="bg-brand_white focus:ring-transparent focus:shadow-lg !text-brand_text_primary pl-[3rem] peer/searchBar"
        />
        <IoClose
          onClick={(e) => setSearchedText("")}
          className={`text-brand_text_secondary size-7 absolute top-0 right-0 translate-y-[45%] -translate-x-2 cursor-pointer hover:text-brand_text_primary transition duration-200 peer-focus/searchBar:block ${
            searchedText !== "" ? "block" : "hidden"
          }`}
        />
      </div>
    </div>
  );
}
