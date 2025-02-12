import { useState } from "react";
import Button from "../../../components/button";
import SocialMedia from "./socialMedia";
import Modal from "../../../components/modal";
import Input from "../../../components/input";
import { NewWebsiteProps } from "../types";

const initState: NewWebsiteProps = {
  name: "",
  url: "",
};

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
  const [newWebsite, setNewWebsite] = useState<NewWebsiteProps>(initState);

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setNewWebsite((p: NewWebsiteProps) => ({ ...p, [name]: value }));
  };

  const handleModalClose = () => setNewWebsite(initState);

  const handleAddNewWebsite = async () => {
    setNewWebsite(initState);
  };

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
          <Modal
            call={<Button onClick={() => {}} text="New Website" />}
            cancelText="Cancel"
            saveText="Save Website"
            onSave={handleAddNewWebsite}
            onCancel={handleModalClose}
            title="Add New Website"
            callTailwind="w-full"
            content={
              <>
                <Input
                  name="name"
                  onChange={handleInputChange}
                  placeholder="website name"
                  type="text"
                  value={newWebsite.name}
                  label="Name"
                  inputTailwindUtilities="mb-5"
                  labelTailwindUtilities="ml-4"
                />
                <Input
                  name="url"
                  onChange={handleInputChange}
                  placeholder="website address"
                  type="url"
                  value={newWebsite.url}
                  label="URL"
                  labelTailwindUtilities="ml-4"
                />
              </>
            }
          />
        </div>
      </section>
    </div>
  );
}
