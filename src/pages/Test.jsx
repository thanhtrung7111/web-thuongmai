import React from "react"; // import Asus from "@assets/img/asus.jpg";
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
  return (
    <GridComponent>
      <Column
        title="Cột tên"
        type="checkbox"
        headerElement={<ElemetHead></ElemetHead>}
        bodyElement={<ElementBody></ElementBody>}
        width={"100px"}
      ></Column>
      <Column title="Cột tên" name="name" sort="true" width={"200px"}></Column>
      <Column title="Cột id" name="id" sort="true" width={"100px"}></Column>
      <Column
        title="Cột id"
        name="price"
        sort="true"
        type="number"
        width={"100px"}
      ></Column>
    </GridComponent>
  );
};

export default Test;
