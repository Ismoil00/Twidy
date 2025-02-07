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
    <div className="pt-10 px-[3vw] sm:pt-5 sm:pr-[2vw] sm:pl-0 flex md:gap-4 lg:gap-8 md:items-center">
      <div className="searchBar relative flex-1">
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
      <div className="hidden sm:w-[100px] md:w-auto sm:flex flex-col lg:flex-row items-end md:items-center gap-2 lg:gap-4 cursor-pointer group/profile relative">
        <span className="w-[15px] h-[15px] bg-brand_green rounded-full absolute left-0 translate-x-[220%] md:translate-x-[270%] lg:translate-x-[350%] ring-4 ring-brand_gray"></span>
        <img
          src="assets/person-02.png"
          alt="User Profile Image"
          className="w-[60px] h-[70px] rounded-16px object-cover object-center group-hover/profile:shadow-custom-sm transition duration-200"
        />
        <h2 className="font-700 text-brand_text_primary group-hover/profile:text-brand_text_primary/60 transition duration-200 sm:text-right md:text-center text-wrap">
          {"Екатерина Варнава"}
        </h2>
      </div>
      <span className="hidden md:block h-[35px] w-[3px] bg-[#E1E2EB] rounded-12px"></span>
      <div className="hidden md:block">
        <Logout />
      </div>
    </div>
  );
}
