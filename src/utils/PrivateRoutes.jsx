import React, { useEffect, useState } from 'react';
import {Outlet,Navigate} from "react-router-dom";
import { toast } from 'react-toastify';
import { account } from '../appwrite/config';
import {useNavigate} from "react-router-dom";
import { useAuthStore } from '../store/AuthStore';
function PrivateRoutes() {
  const navigate=useNavigate();
  const auth =useAuthStore((state)=>state.auth);
  const [state,setState] = useState(true);
  const [isVerified,setIsVerified]=useState(true);
   useEffect(() => {
     async function doFirst(){
       try {
         const data = await account.get("current");        
         if(!data.emailVerification) {
          toast.error("you need to verify!",{
            position: "top-center",
          });
           setIsVerified(false);
         } 
      
       } catch (error) {
           setState(false);
         toast.error("you need to login!", {
           position: "top-center",
         });
         return <Navigate to="/signup" />;
       }
      
     }
   doFirst();
   }, [auth])
  

  return (
    state?isVerified?<Outlet />:<Navigate to="/auth/verify" />:<Navigate to="/signup" />
  )
}

export default PrivateRoutes;