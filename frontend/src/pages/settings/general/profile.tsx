import Button from "../../../components/button";
import Input from "../../../components/input";

export default function Profile() {
  return (
    <div>
      <h1 className="text-brand_text_primary text-center sm:text-left font-700 text-3xl sm:text-4xl mt-10 mb-5 ml-5">
        Profile
      </h1>
      <article>
        <div>
          <Button onClick={() => {}} text="Change Photo" type="button" />
        </div>
        <img
          src="assets/person-02.png"
          alt="Your Profile Photo"
          className="w-[100px] h-[100px]"
        />
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
        <select name="profession" id="profession">
          <option value="">Select Profession</option>
          <option value="1">Developer</option>
          <option value="2">Designer</option>
          <option value="3">Marketer</option>
          <option value="4">Writer</option>
        </select>
        <textarea
          name="description"
          id="description"
          placeholder="Your Description"
        />
        <Button onClick={() => {}} text="Save" type="button" />
      </article>
    </div>
  );
}
