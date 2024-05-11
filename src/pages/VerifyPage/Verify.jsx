import React, { useEffect, useState } from 'react';
import verifyImg from "../../assets/images/verification.png";
import { useAuthStore } from '../../store/AuthStore';
import { useNavigate } from "react-router-dom";
import { account } from '../../appwrite/config';
import {toast} from "react-toastify";

function Verify() {
    const navigate = useNavigate();
    const auth = useAuthStore((state) => state.auth);
    const authVerify = useAuthStore((state)=>state.doVerify)
    const [userId, setUserId] = useState(null);
    const [secret, setSecret] = useState(null);

    useEffect(() => {
        // Parse the URL to get query parameters
        toast.error("You need to verify!", {
            position: "top-center",
          });
        const searchParams = new URLSearchParams(window.location.search);
        const userIdParam = searchParams.get('userId');
        const secretParam = searchParams.get('secret');
        // Update state with parameters
        setUserId(userIdParam);
        setSecret(secretParam);
    }, []);
    const doVerify=async()=>{
        try {
            const verify=await account.updateVerification(userId,secret);
            toast.success("Verified successfully!", {
                position: "top-center",
              });
            await authVerify();
            navigate("/");
        } catch (error) {
            console.log(error)
        }
    }

    const handleVerify = async () => {
        const data = await account.get("current");
      if(!data.emailVerification){
      const link = account.createVerification("http://localhost:5173/#/auth/verify");
      }
      if(!userId&&!secret){
        toast.success("Email sent successfully!", {
            position: "top-center",
          });
      }
      if(userId&&secret) {
        doVerify()
    }
    };

    console.log(userId, secret);

    return (
        <section className='min-h-[80vh] flex flex-col items-center justify-center gap-1 text-center'>
            <img src={verifyImg} className='w-24 mb-5' alt="" />
            <p className='text-slate-900 font-medium text-xl'>Verify your email address</p>
            <p className='text-slate-800 text-sm'>You've entered <span className='text-blue-800'>{auth?.email}</span> as the email address for your account</p>
            <p className='text-slate-800 text-sm'>Please verify this email address by clicking the button below.</p>
            <button className='bg-blue-500 text-white py-2 px-8 rounded-md font-medium my-3' onClick={handleVerify}>Verify Email</button>
        </section>
    );
}

export default Verify;
