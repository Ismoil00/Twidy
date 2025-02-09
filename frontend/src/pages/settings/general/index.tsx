import Profile from "./profile";
import SocialMedias from "./socialMedias";
import Formalization from "./formalization";
import Security from "./security";

export default function General() {
  return (
    <div>
      <Profile />
      <section>
        <SocialMedias />
        <Formalization />
        <Security />
      </section>
    </div>
  );
}
