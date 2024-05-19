import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import wrong from "../../assets/images/wrong.png";
function Cancel() {
  const { token } = useParams();
  const navigate = useNavigate();
  const access_token = sessionStorage.getItem("access_token");

  useEffect(() => {
    if (access_token != token || !access_token) {
      navigate("/");
    }
    setTimeout(()=>{
      sessionStorage.setItem("access_token"," ")
      navigate("/");
    },4000)
  }, []);
  return (
    <>
      {access_token == token ? (
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
          <img className=" w-16 mb-5" src={wrong} />
          <p className="text-slate-900 pb-1 font-medium text-2xl">
            Payment Failed
          </p>
          <p className="text-slate-700 pb-4 font-medium">
            Your transaction failed!
          </p>
          <p className="pb-4 text-slate-700 font-medium">order Id : {token}</p>
          <Link to="/">
            <button className=" bg-blue-600 text-slate-50 py-2 px-5 rounded-lg">
              Back to Home
            </button>
          </Link>
        </div>
      ) : (
        " "
      )}
    </>
  );
}

export default Cancel;
