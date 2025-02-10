import Button from "../../../components/button";
import Input from "../../../components/input";
import Textarea from "../../../components/textarea";
import Dropdown from "../../../components/drowdown";
import { useState } from "react";

const professions = [
  {
    id: "empty-initial-value",
    value: "Choose your profession",
  },
  {
    id: "artist",
    value: "Artist",
  },
  {
    id: "musician",
    value: "Musician",
  },
  {
    id: "youtuber",
    value: "YouTuber",
  },
  {
    id: "blogger",
    value: "Blogger",
  },
  {
    id: "actor",
    value: "Actor",
  },
];

export default function Profile() {
  const [selectedProfession, setSelectedProfession] = useState<string>("");

  return (
    <div className="min-w-[200px] sm:max-w-[410px]">
      <h1 className="text-brand_text_primary text-center sm:text-left font-700 text-3xl sm:text-4xl mt-10 mb-5 ml-5">
        Profile
      </h1>
      <article className="flex flex-col gap-2 bg-brand_white rounded-20px p-3 relative">
        <img
          src="assets/person-03.png"
          alt="Your Profile Photo"
          className="w-full rounded-16px object-contain object-center"
        />
        <div className="sm:w-auto sm:absolute translate-x-0 translate-y-0 sm:translate-x-[85%] sm:translate-y-[800%]">
          <Button
            onClick={() => {}}
            text="Change Photo"
            type="button"
            tailwindUtilities="bg-brand_orange !py-1 !px-5 hover:bg-brand_orange/90 active:bg-brand_orange/80"
          />
        </div>
        <Input
          name="firstname"
          onChange={() => {}}
          placeholder="Your Firstname"
          type="text"
          value={""}
        />
        <Input
          name="lastname"
          onChange={() => {}}
          placeholder="Your Lastname"
          type="text"
          value={""}
        />
        <Input
          name="username"
          onChange={() => {}}
          placeholder="Your Username"
          type="text"
          value={""}
        />
        <Dropdown
          name="professions"
          onChange={() => {}}
          options={professions}
          value={selectedProfession}
        />
        <Textarea
          name="description"
          onChange={() => {}}
          placeholder="Your Description"
          value={""}
          textareaTailwindUtilities="mb-3"
        />
        <Button onClick={() => {}} text="Save" type="button" />
      </article>
    </div>
  );
}
