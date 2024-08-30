import React from "react";

const ProductSummaryReview = ({ reviews = [], itemKey = "" }) => {
  return (
    <div className="flex flex-col md:flex-row  items-center md:items-start gap-10 px-5 py-5">
      <div className="flex flex-col items-center justify-center w-fit md:pr-10 md:border-r">
        <span className="text-9xl font-normal text-gray-700">
          {reviews.length <= 0
            ? 0
            : (
                reviews.reduce(
                  (value, currentValue) => value + currentValue[itemKey],
                  0
                ) / reviews.length
              ).toFixed(1)}
        </span>
        <div>
          <div className="flex items-center gap-x-1">
            {reviews.length >= 1
              ? Array(
                  Math.floor(
                    reviews.reduce(
                      (value, currentValue) => value + currentValue[itemKey],
                      0
                    ) / reviews.length
                  )
                )
                  .fill("-")
                  .map((item) => {
                    return (
                      <i className="ri-star-fill text-yellow-400 text-xl"></i>
                    );
                  })
              : [1, 2, 3, 4, 5].map((item) => {
                  return <i class="ri-star-line text-yellow-400 text-xl"></i>;
                })}
            {reviews.length >= 1 &&
              Math.floor(
                reviews.reduce(
                  (value, currentValue) => value + currentValue[itemKey],
                  0
                ) / reviews.length
              ) <
                reviews.reduce(
                  (value, currentValue) => value + currentValue[itemKey],
                  0
                ) /
                  reviews.length && (
                <i class="ri-star-half-line text-yellow-400 text-xl"></i>
              )}
            {reviews.length >= 1 &&
              Array(
                Math.floor(
                  5 -
                    reviews.reduce(
                      (value, currentValue) => value + currentValue[itemKey],
                      0
                    ) /
                      reviews.length
                )
              )
                .fill("-")
                .map((item) => {
                  return (
                    <i className="ri-star-line text-yellow-400 text-xl"></i>
                  );
                })}
          </div>
        </div>
        <span className="text-gray-light">( {reviews.length} Đánh giá )</span>
      </div>

      <div className="flex flex-col gap-y-2">
        {[1, 2, 3, 4, 5].map((item) => {
          return (
            <div className="flex gap-x-2 items-center">
              <span className=" text-yellow-400 font-medium w-6 flex items-start">
                {item}
                <i className="ri-star-fill text-sm"></i>
              </span>

              <div className="relative w-[200px] bg-slate-300 h-[5px] rounded-md overflow-hidden">
                <div
                  className={`absolute left-0 top-0 w-1/4 h-full ${
                    (reviews.filter((i) => i[itemKey] == item).length /
                      reviews.length) *
                      100 >
                    50
                      ? "bg-green-700"
                      : "bg-red-700"
                  }`}
                  style={{
                    width: `${
                      reviews.length <= 0
                        ? 0
                        : (reviews.filter((i) => i[itemKey] == item).length /
                            reviews.length) *
                          100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductSummaryReview;
