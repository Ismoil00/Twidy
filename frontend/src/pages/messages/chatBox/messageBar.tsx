import { MdAttachFile } from "react-icons/md";
import { IoSend } from "react-icons/io5";

interface MessageBarCompProps {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

export default function MessageBar({
  message,
  setMessage,
}: MessageBarCompProps) {
  return (
    <div className="relative w-[90%] mx-auto">
      <MdAttachFile className="absolute top-[10px] left-2 size-8 text-brand_text_primary rotate-45 cursor-pointer hover:text-brand_text_primary/50 transition duration-200 active:text-brand_text_primary/75" />
      <input
        type="text"
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="input w-full top-3 pl-11 pr-12 py-3 rounded-20px bg-brand_white border border-brand_text_primary/20 text-brand_text_primary tracking-wide focus:outline-none transition duration-100 focus:border-brand_text_primary/40 placeholder-brand_text_secondary"
      />
      <IoSend className="absolute top-[14px] right-3 size-7 text-brand_text_primary cursor-pointer hover:text-brand_text_primary/50 transition duration-200 active:text-brand_text_primary/75" />
    </div>
  );
}
