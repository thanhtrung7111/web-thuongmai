import React from "react";

const ChooseStar = ({
  onChangeStar,
  star,
  levels = {
    high: { level: 4, description: "tốt!" },
    medium: { level: 2, description: "tạm ổn!" },
    low: { level: 0, description: "tệ!" },
  },
}) => {
  const caculatorStar = (value) => {
    return (
      <div className="flex items-center gap-x-3">
        <div
          className={`text-xs rounded-3xl px-2 py-1 border ${
            value >= levels.high.level
              ? "text-yellow-600 border-yellow-600"
              : value >= levels.medium.level
              ? "text-gray-dark border-gray-dark"
              : "text-red-600 border-red-600"
          }`}
        >
          Chất lượng{" "}
          {value >= levels.high.level
            ? levels.high.description
            : value >= levels.medium.level
            ? levels.medium.description
            : levels.low.description}
        </div>
      </div>
    );
  };

  return (
    <div className="flex gap-x-1">
      <div className="flex items-center gap-x-1 mb-1">
        {[...Array(5).map((i, index) => index)].map((item, index) => {
          if (index + 1 <= star) {
            return (
              <i
                key={index}
                className="ri-star-fill text-yellow-400 text-xl cursor-pointer"
                onClick={() => onChangeStar(index + 1)}
              ></i>
            );
          }

          return (
            <i
              key={index}
              className="ri-star-line text-yellow-400 text-xl cursor-pointer"
              onClick={() => onChangeStar(index + 1)}
            ></i>
          );
        })}
      </div>
      {caculatorStar(star)}
    </div>
  );
};

export default ChooseStar;
