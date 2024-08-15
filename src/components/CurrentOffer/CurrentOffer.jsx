import { Link } from "react-router-dom";

function CurrentOffer() {
  return (
    <section className="py-12 my-4 w-full font-body bg-blue-100 flex flex-col items-center">
      <h2 className="text-slate-700 text-3xl px-6 font-medium text-center py-8">
        Exclusive
      </h2>
      <Link to={`${import.meta.env.VITE_HOST}/allproducts/product/662dea786210252e6bb38cd8`} className=" max-md:w-[90%]">
        <div className="text-center flex max-md:flex-col flex-col justify-center items-center bg-white w-fit py-5 rounded-lg md:px-5">
          <img
            className="w-[280px] h-[200px] object-contain p-3"
            src="https://firebasestorage.googleapis.com/v0/b/bluekart-a389d.appspot.com/o/lap10.jpg?alt=media&token=69ff5b0a-43c0-4aaf-8473-d7fc1b15c435"
            alt="image of ultra wide gaming monitor"
          />
          <div>

          <h4 className="text-xl font-semibold py-3">Exclusive Offers on Apple Products</h4>
          <h3 className="text-lg text-slate-600 px-4">
          Apple 2024 MacBook Air 13-inch Laptop with M3 chip 
          </h3>
            <button className="bg-blue-500 text-white py-3 px-24 rounded-lg my-5">
              Shop Now
            </button>
          </div>
        </div>
      </Link>
    </section>
  );
}

export default CurrentOffer;
