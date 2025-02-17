import { CompanionProps } from "../types";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DropDownMenu from "../../../components/dropDownMenu";

interface HeaderCompProps {
  companion: CompanionProps;
}

const headerElements = [
  "General materials",
  "Select messages",
  "Clear history",
  "Delete chat",
  "Block",
  "Complain",
];

export default function Header({ companion }: HeaderCompProps) {
  return (
    <section className="flex justify-between items-center py-2 px-4 border-b border-b-brand_gray">
      <div className="flex items-center gap-5 cursor-pointer group/header">
        <div className="relative ">
          {companion.online && (
            <span className="absolute -right-2 top-[40%] w-[15px] h-[15px] rounded-full bg-brand_green ring-brand_gray ring-4"></span>
          )}
          <img
            src="assets/person-04.png"
            alt="Person 01 photo"
            className="w-[50px] h-[50px] rounded-full object-cover object-center group-hover/header:shadow-lg transition duration-200"
          />
        </div>

        <div>
          <h2 className="text-brand_text_primary font-700 capitalize group-hover/header:text-brand_text_primary/70 transition duration-200">
            Falonov Falon
          </h2>
          {companion.online && (
            <p className="text-brand_text_secondary group-hover/header:text-brand_text_primary/70 transition duration-200">
              Online
            </p>
          )}
        </div>
      </div>

      <DropDownMenu
        button={
          <MoreHorizIcon className="text-brand_text_primary scale-150 cursor-pointer hover:text-brand_text_primary/50 transition duration-200" />
        }
        elements={headerElements}
      />
    </section>
  );
}
