import React, { useState } from "react";
import user from "../../assets/images/user.svg";
import mail from "../../assets/images/mail.svg";
import key from "../../assets/images/key.svg";
import visible from "../../assets/images/visible.svg";
import invisible from "../../assets/images/invisible.svg";

function Input({ type, placeholder, image , data , set }) {
    const [showPassword, setShowPassword] = useState(false)
    function handlePassword(){
        setShowPassword(prev=>!prev);
    }
  return (
    <div className=" bg-slate-100 w-auto max-sm:w-3/2 max-sm:mx-2 rounded-lg border-2 flex items-center relative">
      <img
        src={image == "user" ? user : image == "mail" ? mail : key}
        className="w-[15px] ml-5 absolute rounded-sm"
        alt=""
      />
      <input
        className=" bg-slate-100 px-5 py-3 pl-12 rounded-lg w-full"
        type={type=="password"&&showPassword?"text":type}
        placeholder={placeholder}
        value={data}
        onChange={(e)=>set(e.target.value)}
      />
      {type=="password"?<img src={showPassword?invisible:visible} className="w-[18px] absolute right-3" alt="password" onClick={handlePassword}/>:""}
    </div>
  );
}

export default Input;
