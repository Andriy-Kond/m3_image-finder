import React, { Component } from "react";

class Modal extends Component {
  componentDidMount = () => {};

  render() {
    const { largeImageURL, alt } = this.props;

    return (
      <div className="overlay">
        <div className="modal">
          <img src={largeImageURL} alt={alt} />
        </div>
      </div>
    );
  }
}

export default Modal;
