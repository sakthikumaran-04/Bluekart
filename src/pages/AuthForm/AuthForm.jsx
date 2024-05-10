import React, { useEffect, useState } from "react";
import Input from "../../components/Input/Input";
import googleImg from "../../assets/images/google.png";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/AuthStore";
import {useNavigate} from "react-router-dom";
import loadingImg from "../../assets/images/loading-new.gif"
import { database } from "../../appwrite/config";
import {Query} from "appwrite"
function AuthForm({ type }) {
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false);
  const auth = useAuthStore((state) => state.auth);
  const registerWithEmailAndPassword = useAuthStore(
    (state) => state.registerWithEmailAndPassword
  );
  const loginWithEmailAndPassword = useAuthStore(
    (state) => state.loginWithEmailAndPassword
  );
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (type == "sign up") {
      try {
        setLoading(true);
        const res = await database.createDocument(import.meta.env.VITE_DB_ID,import.meta.env.VITE_COLLECTION_ID,`unique()`,{
          email:email,
          cart:[],
          like:[],
          orders:[]
        })
        await registerWithEmailAndPassword(res.$id, email, password, userName);
        
        console.log(res)
        navigate("/signin")
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    }else{
      try {
        setLoading(true);
        const res = await database.listDocuments(import.meta.env.VITE_DB_ID,import.meta.env.VITE_COLLECTION_ID,[
          Query.equal('email',email)])
        await loginWithEmailAndPassword(res.documents[0].$id, email,password);
        navigate("/")
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
  };

  useEffect(() => {
    console.log(auth);
  }, [auth]);
  return (
    <section className="py-12 flex items-center justify-center">
      <div className="font-body flex flex-col items-center justify-center gap-6">
        <h2 className="text-2xl text-slate-800">
          {type == "sign in" ? "Welcome Back!" : "Get Started!"}
        </h2>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          {type == "sign up" ? (
            <Input
              type={"text"}
              placeholder={"username"}
              image={"user"}
              set={setUserName}
              data={userName}
            />
          ) : (
            ""
          )}
          <Input
            type={"email"}
            placeholder={"Email"}
            image={"mail"}
            set={setEmail}
            data={email}
          />
          <Input
            type={"password"}
            placeholder={"Password"}
            image={"key"}
            set={setPassword}
            data={password}
          />
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
            {loading? <div className="flex justify-center gap-4 items-center"><img src={loadingImg} className="w-[25px]" alt="loading" /> <p>Loading</p></div>: type}
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
