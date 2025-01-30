import Logout from "../../components/logout";
import Sessions from "../../components/sessions";

export default function HomePage() {
  return (
    <div className="bg-brand_gray">
      <Logout />
      HomePage
      <Sessions />
    </div>
  );
}
