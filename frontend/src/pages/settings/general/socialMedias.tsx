import { useState } from "react";
import Button from "../../../components/button";
import SocialMedia from "./socialMedia";

export default function SocialMedias() {
  const [socialMedias, setSocialMedias] = useState<any>([
    {
      id: 1,
      name: "Vanilnoe_nebo_1",
      platform: "facebook",
    },
    {
      id: 2,
      name: "Vanilnoe_nebo_1",
      platform: "x",
    },
    {
      id: 3,
      name: "Vanilnoe_nebo_1",
      platform: "instagram",
    },
  ]);

  const handleAddNewWebsite = async () => {};

  return (
    <div>
      <h1 className="text-brand_text_primary text-center sm:text-left font-700 text-3xl sm:text-4xl mt-10 mb-5 ml-5">
        Social Medias
      </h1>
      <section className="w-[620px] flex gap-5 flex-wrap">
        {socialMedias.map((socialMedia: any) => (
          <SocialMedia
            key={socialMedia.id}
            icon={socialMedia.platform}
            name={socialMedia.name}
            onClick={() => {}}
          />
        ))}
        <div className="w-[300px] h-fit p-5 flex gap-5 items-center rounded-20px bg-brand_white">
          <Button onClick={handleAddNewWebsite} text="New Website" />
        </div>
      </section>
    </div>
  );
}
