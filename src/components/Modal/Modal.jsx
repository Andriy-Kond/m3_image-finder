import React, { Component } from "react";
import * as basicLightbox from "basiclightbox";
// import "basiclightbox/dist/basicLightbox.min.css";
import "basiclightbox/src/styles/main.scss";
import { Overlay, ModalIns, ModalImg } from "./Modal.styled";

// $basicLightbox__background: rgba(0, 0, 0, 0.8); // Background color
// $basicLightbox__zIndex: 1000; // Stack order
// $basicLightbox__duration: 0.4s; // Transition duration
// $basicLightbox__timing: ease; // Transition timing

class ModalWindow extends Component {
  state = {
    instance: null,
  };

  componentDidMount = () => {
    window.addEventListener("keydown", this.handleKeydownEsc);

    const { image } = this.props;
    const instance = basicLightbox.create(
      ` <${Overlay}>
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
