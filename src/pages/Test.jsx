import React, { useEffect } from "react"; // import Asus from "@assets/img/asus.jpg";
import ImageMagnifier from "../components/ImageMagnifier";

import Column from "../components/grid/Column";
import GridComponent from "../components/grid/GridComponent";
const ElemetHead = (...props) => {
  return <input type="CheckBox" />;
};

const ElementBody = (...props) => {
  return <p>{"hello"}</p>;
};
const Test = () => {
  useEffect(() => {
    const timeValue = 1713517256 - Math.floor(new Date().getTime() / 1000);
    let timeRemain = 1713517256 - Math.floor(new Date().getTime() / 1000);
    if (timeRemain >= 0) {
      const intervalTime = setInterval(() => {
        document.getElementById("timeTranfer").textContent =
          Math.floor(timeRemain / 60) +
          ":" +
          (Math.floor(timeRemain % 60) >= 10
            ? Math.floor(timeRemain % 60)
            : "0" + Math.floor(timeRemain % 60));
        document.getElementById("progressTime").style.width =
          100 - ((timeValue - timeRemain) / timeValue) * 100 + "%";
        --timeRemain;
        if (timeRemain == -1) {
          clearInterval(intervalTime);
          document.getElementById("timeTranfer").textContent =
            "Hết hạn thanh toán";
        }
      }, 1000);
    }
  }, []);
  return (
    <div className="p-11">
      <div id="timeTranfer"></div>
      <div className="w-96 h-1 bg-slate-300">
        <div className="h-full bg-red-600" id="progressTime"></div>
      </div>
    </div>
  );
};

export default Test;
