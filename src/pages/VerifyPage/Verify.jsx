import React, { useEffect, useState } from "react";
import verifyImg from "../../assets/images/verification.png";
import { useAuthStore } from "../../store/AuthStore";
import { useNavigate } from "react-router-dom";
import { account } from "../../appwrite/config";
import { toast } from "react-toastify";

function Verify() {
  const navigate = useNavigate();
  const auth = useAuthStore((state) => state.auth);
  const authVerify = useAuthStore((state) => state.doVerify);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [userId, setUserId] = useState(null);
  const [secret, setSecret] = useState(null);
  const doVerify = async (id, secrt) => {
    try {
      setLoading(true);
      const verify = await account.updateVerification(id, secrt);
      toast.success("Verified successfully!", {
        position: "top-center",
      });
      await authVerify();
      setLoading(false);
      window.history.replaceState(null, null, window.location.pathname);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    async function doFirst() {
      try {
        const data = await account.get("current");
        const searchParams = new URLSearchParams(window.location.search);
        const userIdParam = searchParams.get("userId");
        const secretParam = searchParams.get("secret");
        if (userIdParam) {
          doVerify(userIdParam, secretParam);
        }
        // Update state with parameters
        setUserId(userIdParam);
        setSecret(secretParam);
      } catch (error) {
        toast.error("You need to Login!", {
          position: "top-center",
        });
        navigate("/signup");
      }
    }
    doFirst();
  }, []);

  const handleVerify = async () => {
    setLoading(true);
    const data = await account.get("current");
    if (!data.emailVerification) {
      const link = await account.createVerification(
        "http://localhost:5173/#/auth/verify"
      );
      console.log(link);
      if (link.$id) {
        toast.success("Email sent successfully!", {
          position: "top-center",
        });
      }
      setLoading(false);
      setStatus("done");
    }
  };

  console.log(userId, secret);

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center gap-1 text-center">
      <img src={verifyImg} className="w-24 mb-5" alt="" />
      <p className="text-slate-900 font-medium text-xl">
        Verify your email address
      </p>
      <p className="text-slate-800 text-sm">
        You've entered <span className="text-blue-800">{auth?.email}</span> as
        the email address for your account
      </p>
      <p className="text-slate-800 text-sm">
        Please verify this email address by clicking the button below.
      </p>
      <button
        className="bg-blue-500 text-white py-2 px-8 rounded-md font-medium my-3"
        onClick={handleVerify}
      >
        {userId || loading ? "Please Wait" : status ? "sent!" : "Verify Email"}
      </button>
    </section>
  );
}

export default Verify;
