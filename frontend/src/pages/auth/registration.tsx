import React, { useState } from "react";
import Button from "../../components/button";
import Input from "../../components/input";
import { Link } from "react-router-dom";

interface UserInitialData {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
}

export default function Registration(): JSX.Element {
  const [user, setUser] = useState<UserInitialData>({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser({ ...user, [name]: value });
  };

  const onSubmit = async () => {
    console.log("clicked");

    if (Object.values(user).some((val: string | undefined) => val === "")) {
      alert("Please fill all the required fields");
      return;
    }
  };

  return (
    <form
      className="registration-page px-5 sm:px-0 pb-24 sm:w-[500px] m-auto translate-y-[15%]"
      onSubmit={(e: React.FormEvent) => e.preventDefault()}
    >
      <h1 className="w-full text-center mb-10 text-brand_text_primary text-36px font-700">
        Register to TWIDY
      </h1>
      <div className="mt-5">
        <Input
          type="text"
          name="username"
          onChange={onChange}
          value={user.username}
          label="Username"
          placeholder="username2025"
        />
      </div>
      <div className="mt-5">
        <Input
          type="password"
          name="password"
          onChange={onChange}
          value={user.password}
          label="Password"
          placeholder="adf44!@$@#"
        />
      </div>
      <div className="mt-5">
        <Input
          type="text"
          name="firstname"
          onChange={onChange}
          value={user.firstname}
          label="Firstname"
          placeholder="Test"
        />
      </div>
      <div className="mt-5">
        <Input
          type="text"
          name="lastname"
          onChange={onChange}
          value={user.lastname}
          label="Lastname"
          placeholder="Test"
        />
      </div>
      <div className="mt-5">
        <Input
          type="email"
          name="email"
          onChange={onChange}
          value={user.email}
          label="Email"
          placeholder="test-test@gmail.com"
        />
      </div>
      <div className="mt-10">
        <Button text="Register" onClick={onSubmit} type="submit" />
      </div>
      <div className="mt-4 px-5 w-full flex justify-between">
        <p className="text-brand_text_primary font-600">
          Already have an account?
        </p>
        <Link
          to="/login"
          className="text-brand_blue hover:text-brand_blue_active"
        >
          <p className="text-brand_blue font-700 hover:text-brand_blue/80 active:text-brand_blue/70 transition-colors">
            Log in now
          </p>
        </Link>
      </div>
    </form>
  );
}
