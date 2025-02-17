import Logout from "../../components/logout";
import Input from "../../components/input";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import SearchBar from "../../components/searchBar";

/* HOMEPAGE HEADER */
export default function Header() {
  const [searchedText, setSearchedText] = useState<string>("");

  console.log(searchedText);

  return (
    <div className="pt-10 px-[3vw] sm:pt-5 sm:pr-[2vw] sm:pl-0 flex md:gap-4 lg:gap-8 md:items-center">
      <SearchBar
        searchedText={searchedText}
        setSearchedText={setSearchedText}
      />
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
