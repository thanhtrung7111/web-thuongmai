import React from "react";
import { usePanigation, DOTS } from "./usePanigation";
import { current } from "@reduxjs/toolkit";

const Panigation = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 3,
    currentPage,
    pageSize,
    scrollTo,
  } = props;

  const paginationRange = usePanigation({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  // if (currentPage === 0 || paginationRange.length < 2) {
  //   return null;
  // }
  const onPrevious = (e) => {
    if (currentPage == 1) return;
    onPageChange(currentPage - 1);
    scrollToElement();
  };

  // console.log(paginationRange);
  const onNext = () => {
    if (currentPage == lastPage) return;
    onPageChange(currentPage + 1);
    scrollToElement();
  };

  function scrollToElement() {
    window.scrollTo(0, document.getElementById(scrollTo).offsetTop - 125);
  }
  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <div className="flex items-center justify-center gap-x-2">
      <button
        type="button"
        onClick={onPrevious}
        className={`w-7 h-7 border rounded-sm flex items-center justify-center text-gray-light text-sm cursor-pointer ${
          currentPage == 1 && "cursor-not-allowed"
        }`}
        // disabled={currentPage == 1}
      >
        {"<"}
      </button>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber == DOTS) {
          return (
            <button
              type="button"
              key={index}
              className="w-7 h-7 border-gray-light border bg-white text-gray-400 rounded-sm flex items-center justify-center text-sm cursor-pointer"
            >
              {pageNumber}
            </button>
          );
        }

        return (
          <button
            type="button"
            key={index}
            className={`w-7 h-7 ${
              currentPage == pageNumber
                ? "border-second border bg-second text-white"
                : "border-gray-light border bg-white text-gray-400"
            } rounded-sm flex items-center justify-center text-sm cursor-pointer`}
            onClick={() => {
              onPageChange(pageNumber);
              scrollToElement();
            }}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        type="button"
        onClick={onNext}
        // disabled={currentPage == lastPage}
        className={`${
          currentPage == lastPage && "cursor-not-allowed"
        } w-7 h-7 border rounded-sm flex items-center justify-center text-gray-light text-sm cursor-pointer `}
      >
        {">"}
      </button>
    </div>
  );
};

export default Panigation;
