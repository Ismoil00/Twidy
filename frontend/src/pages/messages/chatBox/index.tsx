import { useState } from "react";
import MessageBar from "./messageBar";
import Header from "./header";
import MessagesBox from "./messagesBox";
import { CompanionProps } from "../types";

const companion: CompanionProps = {
  id: 1,
  name: "Falonov Falon",
  online: true,
};

export default function ChatBox() {
  const [message, setMessage] = useState<string>("");

  return (
    <div className="h-screen bg-brand_white/50 flex-1 flex flex-col justify-between">
      {/* HEADER */}
      <Header companion={companion} />

      {/* MESSAGES-BOX */}
      <MessagesBox />

      {/* MESSAGE-BAR */}
      <MessageBar message={message} setMessage={setMessage} />
    </div>
  );
}
