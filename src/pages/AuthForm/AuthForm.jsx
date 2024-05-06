import React from "react";
import Input from "../../components/Input/Input";
import googleImg from "../../assets/images/google.png";
import { Link } from "react-router-dom";

function AuthForm({ type }) {
  return (
    <section className="py-12 flex items-center justify-center">
      <div className="font-body flex flex-col items-center justify-center gap-6">
        <h2 className="text-2xl text-slate-800">
          {type == "sign in" ? "Welcome Back!" : "Get Started!"}
        </h2>
        <form className="flex flex-col gap-3">
          {type == "sign up" ? (
            <Input type={"text"} placeholder={"username"} image={"user"} />
          ) : (
            ""
          )}
          <Input type={"email"} placeholder={"Email"} image={"mail"} />
          <Input type={"password"} placeholder={"Password"} image={"key"} />
          <div className="flex items-center justify-between py-2">
            <div className="flex gap-2 max-sm:mx-2">
              <input type="checkbox" name="remember-me" id="remember-me" />
              <p className=" text-slate-700 text-xs font-medium">Remember me</p>
            </div>
            <div className="flex justify-between items-center text-slate-700 font-medium mr-2 underline-offset-2 cursor-pointer">
              {type == "sign in" ? (
                <Link to="/signup">
                  <div className="text-xs flex gap-1 items-center">
                    <p>Create Account?</p>
                    <p className="underline text-blue-500">Sign up</p>
                  </div>
                </Link>
              ) : (
                <Link to="/signin">
                  <div className="text-xs flex gap-1 items-center">
                    <p>Already a user?</p>{" "}
                    <p className="underline text-blue-500">Sign in</p>
                  </div>
                </Link>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="py-3 w-auto bg-blue-500 rounded-lg max-sm:mx-2"
          >
            {type}
          </button>
          <div className="flex items-center py-2 max-sm:mx-2">
            <div className="bg-slate-300 h-[2px] w-1/2"></div>
            <p className="text-slate-600 px-3">OR</p>
            <div className="bg-slate-300 h-[2px] w-1/2"></div>
          </div>
          <button className="flex items-center justify-center gap-3 text-slate-800 py-3 max-sm:mx-2 bg-slate-100 rounded-lg">
            <img src={googleImg} className="w-[26px]" alt="" />
            <p>Continue with Google</p>
          </button>
        </form>
      </div>
    </section>
  );
}

export default AuthForm;
