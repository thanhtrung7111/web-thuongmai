import React from "react";
import Chuot from "../assets/img/chuot.jpg";
const CategoryCard = ({ id, name, image }) => {
  return (
    <div className="flex items-center flex-col gap-y-3 cursor-pointer">
      <div className="rounded-full w-32 h-32 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105">
        <img
          src={image ? image : Chuot}
          alt=""
          className="w-20 h-20 object-contain object-center rounded-full"
        />
      </div>
      <h4 className="text-slate-700 text-sm font-medium">
        {name ? name : "None"}
      </h4>
    </div>
  );
};

export default CategoryCard;
