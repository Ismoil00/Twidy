import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const companion = {
  id: 1,
  name: "Falonov Falon",
  online: true,
};

export default function ChatBox() {
  return (
    <div className="bg-brand_light_blue flex-1 flex flex-col justify-between">
      {/* HEADER */}
      <section className="flex justify-between items-center py-2 px-4">
        <div className="flex items-center gap-5 cursor-pointer">
          <div className="relative">
            {companion.online && (
              <span className="absolute -right-2 top-[40%] w-[15px] h-[15px] rounded-full bg-brand_green ring-brand_gray ring-4"></span>
            )}
            <img
              src="assets/person-04.png"
              alt="Person 01 photo"
              className="w-[70px] h-[80px] rounded-12px object-cover object-center"
            />
          </div>

          <div>
            <h2 className="text-brand_text_primary font-700 capitalize">
              Falonov Falon
            </h2>
            {companion.online && (
              <p className="text-brand_text_secondary font-700">Online</p>
            )}
          </div>
        </div>

        <MoreHorizIcon className="text-brand_text_primary scale-150 cursor-pointer hover:text-brand_text_primary/50 transition duration-200" />
      </section>

      {/* BODY */}

      {/* TYPING */}
      <div>
        
      </div>
    </div>
  );
}
