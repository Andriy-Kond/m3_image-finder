import React, { Component } from "react";
import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";

class Modal extends Component {
  state = {
    instance: null,
  };

  componentDidMount = () => {
    window.addEventListener("keydown", this.handleKeydownEsc);

    const { image } = this.props;
    const instance = basicLightbox.create(
      `
        <div className="overlay">
        <div className="modal">
        <img src=${image.largeImageURL} alt=${image.tags} />
        </div>
        </div>
        `,
      {
        onClose: () => {
          this.props.toggleShowImage();
        },
      },
    );

    this.setState({ instance }, () => {
      this.state.instance.show();
    });
  };

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeydownEsc);
    console.log("unmount");
  }

  handleKeydownEsc = e => {
    if (e.code === "Escape") {
      this.state.instance.close();
    }
  };

  render() {
    return <></>;
  }
}

export default Modal;
