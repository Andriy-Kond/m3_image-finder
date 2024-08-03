// import { MdOutlineImageSearch } from "react-icons/md";
// <MdOutlineImageSearch />

import React, { Component } from "react";

class Button extends Component {
  render() {
    const { onLoadMore, isDisabledLoadMoreBtn } = this.props;
    return (
      <button
        type="button"
        onClick={onLoadMore}
        disabled={isDisabledLoadMoreBtn}>
        Load More
      </button>
    );
  }
}

export default Button;
