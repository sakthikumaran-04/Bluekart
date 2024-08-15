
import instagram from "../../assets/images/instagram.svg";
import twitter from "../../assets/images/twitter.svg";
import linkedin from "../../assets/images/linkedin.svg";
import github from "../../assets/images/github.svg";
import top from "../../assets/images/top.png";
import { Link } from "react-router-dom";

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
          <Link to={`/categories/smartphone`}><p className="cursor-pointer text-sm">Phones</p></Link>
          <Link to={`/categories/laptop`}><p className="cursor-pointer text-sm">Laptops</p></Link>
          <Link to={`/categories/furniture`}><p className="cursor-pointer text-sm">Furnitures</p></Link>
          <Link to={`/categories/lighting`}><p className="cursor-pointer text-sm">Lighting</p></Link>
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-lg pb-1">Help</h3>
          <p className="cursor-pointer text-sm"><a href="mailto:sakthikumaranofficial@gmail.com">Contact us</a></p>
          <p className="cursor-pointer text-sm"><a href="mailto:sakthikumaranofficial@gmail.com">FAQ</a></p>
          <p className="cursor-pointer text-sm"><a href="mailto:sakthikumaranofficial@gmail.com">Copyright</a></p>
        </div>
        <div className="flex gap-1 items-center justify-center">
        <a href="https://linkedin.com/in/sakthikumaran-n"><img src={linkedin} className="w-[30px]" alt="go to linkedin" /></a>
        <a href="https://x.com/sakthi_kumaran_"><img src={twitter} className="w-[30px]" alt="go to twitter" /></a>
        <a href="https://www.instagram.com/_sakthikumaran_/"><img src={instagram} className="w-[30px]" alt="go to instagram" /></a>
        <a href="https://github.com/sakthikumaran-04"><img src={github} className="w-[30px]" alt="go to github" /></a>
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
