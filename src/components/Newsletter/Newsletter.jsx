import React from "react";
import Newsletter_img from "../../assets/images/newsletter.webp";

function Newsletter() {
  return (
    <section className="flex items-center justify-center py-12 w-full">
      <div className="grid grid-cols-3 place-items-center text-center p-3 w-full font-body max-md:grid-cols-1">
        <div className="w-full">
          <img src={Newsletter_img} alt="Newsletter" />
        </div>
        <div className="col-span-2">
          <h3 className="text-2xl pt-5 font-medium text-slate-900">
            Subscribe to Newletter
          </h3>
          <h4 className="text-sm p-2 py-3 font-medium text-slate-500">
            Stay updated by subscribing to our newsletter
          </h4>
          <div className="grid grid-cols-3">
            <input
              className="border-2 p-2 mr-2 rounded-lg col-span-2 "
              type="email"
              name="email"
              id="email"
            />
            <button className="text-sm font-medium p-2 bg-blue-500 rounded-lg">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
