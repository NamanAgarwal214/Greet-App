import React from "react";
import { ColorRing } from "react-loader-spinner";

const Loader = ({ width, height }) => {
  return (
    <ColorRing
      visible={true}
      height={height}
      width={width}
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={["#fb527a", "#3a3161", "#fb527a", "#3a3161", "#fb527a"]}
    />
  );
};

export default Loader;
