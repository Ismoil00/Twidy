import React, { useState } from "react";
import Button from "../../components/button";
import Input from "../../components/input";
import { Link } from "react-router-dom";

interface UserLoginData {
  username: string;
  password: string;
}

export default function Login(): JSX.Element {
  const [user, setUser] = useState<UserLoginData>({
    username: "",
    password: "",
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
      className="registration-page px-5 sm:px-0 pb-24 sm:w-[500px] m-auto translate-y-[40%]"
      onSubmit={(e: React.FormEvent) => e.preventDefault()}
    >
      <h1 className="w-full text-center mb-10 text-brand_text_primary text-36px font-700">
        Welcome to TWIDY
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
      <div className="mt-10">
        <Button text="Log in" onClick={onSubmit} type="submit" />
      </div>
      <div className="mt-4 px-5 w-full flex justify-between">
        <p className="text-brand_text_primary font-600">
          Don't have an account yet?
        </p>
        <Link
          to="/registration"
          className="text-brand_blue hover:text-brand_blue_active"
        >
          <p className="text-brand_blue font-700 hover:text-brand_blue/80 active:text-brand_blue/70 transition-colors">
            Sign up now
          </p>
        </Link>
      </div>
    </form>
  );
}
