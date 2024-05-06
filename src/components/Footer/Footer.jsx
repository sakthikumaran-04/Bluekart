import React from "react";
import instagram from "../../assets/images/instagram.svg";
import twitter from "../../assets/images/twitter.svg";
import linkedin from "../../assets/images/linkedin.svg";
import github from "../../assets/images/github.svg";
import top from "../../assets/images/top.png";

function Footer() {
  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer>
      <button
        className="flex w-full items-center justify-center bg-slate-800 border-b-2 border-slate-500 py-3"
        onClick={backToTop}
      >
        <p className="text-slate-300 text-lg pr-3 font-medium">Back To Top</p>
        <img src={top} className="w-[18px]" alt="" />
      </button>
      <div className="bg-slate-800 text-slate-300 font-body grid grid-cols-2 text-center p-5 gap-4">
        <div className="flex-1">
          <h3 className="font-medium text-lg pb-1">Shop</h3>
          <p className="cursor-pointer text-sm">Men's</p>
          <p className="cursor-pointer text-sm">Women's</p>
          <p className="cursor-pointer text-sm">Electronics</p>
          <p className="cursor-pointer text-sm">Jewelry</p>
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-lg pb-1">Help</h3>
          <p className="cursor-pointer text-sm">Contact us</p>
          <p className="cursor-pointer text-sm">FAQ</p>
          <p className="cursor-pointer text-sm">Copyright</p>
        </div>
        <div className="flex gap-1 items-center justify-center">
          <img src={linkedin} className="w-[30px]" alt="go to linkedin" />
          <img src={twitter} className="w-[30px]" alt="go to twitter" />
          <img src={instagram} className="w-[30px]" alt="go to instagram" />
          <img src={github} className="w-[30px]" alt="go to github" />
        </div>
        <div>
          <p className="text-sm pt-2">*Terms & conditions</p>
          <p className="text-center text-sm">Icons by <a href="https://icons8.com" className="underline" target="_blank">Icons8</a></p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
