import React, { useState } from "react";
import Button from "../../components/button";
import Input from "../../components/input";
import { Link } from "react-router-dom";
import { ajv } from "../../helpers/validation";
import { AnyValidateFunction } from "ajv/dist/types";
import Notify from "../../components/toast";
import { useNavigate } from "react-router-dom";

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
  const [inputError, setInputError] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser({ ...user, [name]: value });
  };

  const onSubmit = async () => {
    /* VALIDATION */
    const validate = ajv.getSchema(
      "registration"
    ) as AnyValidateFunction<unknown>;
    const valid = await validate(user);

    if (!valid) {
      const field: string | undefined =
        validate.errors?.[0]["instancePath"].split("/")[1];
      const msg: string | undefined = validate.errors?.[0]["message"];

      setInputError(field);
      Notify(msg, "error");
      return;
    }

    /* SERVER REQUEST */
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/auth/registration`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      const data = await response.json();

      if (response.status !== 200) throw new Error(data.msg);

      /* SUCCESS -> NAVIGATE TO LOGIN */
      Notify(data.msg, "success");
      setTimeout(() => {
        Notify("Now, Please Login", "success");
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      Notify(error.message || `REGISTRATION ERROR`, "error");
      console.error("REGISTRATION ERROR: ", error);
    } finally {
      if (inputError) setInputError(undefined);
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
          error={inputError === "username" ? true : false}
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
          error={inputError === "password" ? true : false}
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
          error={inputError === "firstname" ? true : false}
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
          error={inputError === "lastname" ? true : false}
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
          error={inputError === "email" ? true : false}
        />
      </div>
      <div className="mt-10">
        <Button text="Register" onClick={onSubmit} type="submit" />
      </div>
      <div className="mt-4 px-5 w-full flex flex-col items-center sm:flex-row justify-between">
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
