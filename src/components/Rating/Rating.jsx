import React from "react";
import star from "../../assets/images/star.svg";
import star_solid from "../../assets/images/star-solid.svg";

function Rating(props) {
  const rating = Math.round(props.rating);
  return (
    <div className="flex items-center gap-2 justify-center font-body">
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-center">
          {Array.from({ length: rating }, (_, index) => (
            <img key={index} src={star_solid} className="w-[20px]" alt="star" />
          ))}
        </div>
        <div className="flex items-center justify-center text-center">
          {Array.from({ length: 5 - rating }, (_, index) => (
            <img key={index} src={star} className="w-[20px]" alt="star" />
          ))}
          <p className="pt-[3px] pl-2">{props.ratingCount}</p>
        </div>
      </div>
    </div>
  );
}

export default Rating;
