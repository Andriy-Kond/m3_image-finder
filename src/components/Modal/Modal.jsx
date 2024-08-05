import React, { Component } from "react";
import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";
import { Overlay, ModalIns } from "./Modal.styled";

class ModalWindow extends Component {
  state = {
    instance: null,
  };

  componentDidMount = () => {
    window.addEventListener("keydown", this.handleKeydownEsc);

    const { image } = this.props;
    const instance = basicLightbox.create(
      `
        <${Overlay}>
        <${ModalIns}>
        <img src=${image.largeImageURL} alt=${image.tags} />
        </${ModalIns}>
        </${Overlay}>
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

export default ModalWindow;
