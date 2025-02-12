import Profile from "./profile";
import SocialMedias from "./socialMedias";
import Security from "./security";

export default function General() {
  return (
    <div className="min-h-screen flex gap-10 flex-wrap pb-10">
      <Profile />
      <section className="flex-1">
        <SocialMedias />
        <Security />
      </section>
    </div>
  );
}
