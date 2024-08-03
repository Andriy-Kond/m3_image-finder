import React, { Component } from "react";
import { Blocks } from "react-loader-spinner";

class Loader extends Component {
  render() {
    return (
      <Blocks
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        visible={true}
      />
    );
  }
}

export default Loader;
