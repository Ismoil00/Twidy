import React, { useState, useContext } from "react";
import Button from "../../components/button";
import Input from "../../components/input";
import { Link } from "react-router-dom";
import { ajv } from "../../helpers/validation";
import { AnyValidateFunction } from "ajv/dist/types";
import Notify from "../../components/toast";
import { useNavigate } from "react-router-dom";
import { sessionContext } from "../../helpers/sessionContext";
import { Socket } from "socket.io-client";

interface UserLoginData {
  username: string;
  password: string;
}

export default function Login(): JSX.Element {
  const [user, setUser] = useState<UserLoginData>({
    username: "",
    password: "",
  });
  const [inputError, setInputError] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const { connectToSessionSocket } = useContext(sessionContext);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser({ ...user, [name]: value });
  };

  const onSubmit = async () => {
    /* VALIDATION */
    const validate = ajv.getSchema("login") as AnyValidateFunction<unknown>;
    const valid = await validate(user);
    if (!valid) {
      const field: string | undefined =
        validate.errors?.[0]["instancePath"].split("/")[1];
      const msg: string | undefined = validate.errors?.[0]["message"];

      setInputError(field);
      Notify(msg, "error");
      return;
    }

    try {
      /* SERVER REQUEST */
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(user),
          credentials: "include",
        }
      );
      const data = await response.json();

      /* SESSION SOCKET CONNECTION */
      const socket = await connectToSessionSocket();
      let socketResponse;
      if (socket instanceof Socket) {
        socketResponse = await socket.emitWithAck("session:add", {
          userId: data["userId"],
          sessionId: data["sessionId"],
        });
      } else throw socket;

      /* ERROR HANDLE + REDIRECTION */
      if (response.status !== 200 || socketResponse.status !== 200) {
        socket.disconnect();

        if (data.redirect) {
          Notify(data.message, "error");
          navigate(data.redirect);
          return;
        }

        throw response.status !== 200 ? data : socketResponse;
      }

      /* SUCCESS -> NAVIGATE TO HOME-PAGE */
      const token = response.headers.get("authorization");
      localStorage.setItem("session", JSON.stringify({ ...data, token }));
      Notify(`You are welcom ${data["fullname"]}`, "success");
      navigate("/");
    } catch (error: any) {
      Notify(error.message || `LOGIN ERROR`, "error");
      console.error("LOGIN ERROR: ", error);
    } finally {
      if (inputError) setInputError(undefined);
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
      <div className="mt-10">
        <Button text="Log in" onClick={onSubmit} type="submit" />
      </div>
      <div className="mt-4 px-5 w-full flex justify-between flex-col items-center sm:flex-row">
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
