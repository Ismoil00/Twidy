import ChatList from "./chats";
import ChatBox from "./chatBox";

export default function Messages() {
  return <div className="bg-brand_gray min-h-screen flex">
    <ChatList />
    <ChatBox />
  </div>;
}
