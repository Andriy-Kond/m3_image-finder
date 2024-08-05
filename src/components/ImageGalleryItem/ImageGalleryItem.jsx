import React, { Component } from "react";
import { Item, ItemImage } from "./ImageGalleryItem.styled";
import ModalWindow from "components/Modal/Modal";
// import Modal from "components/Modal";

class ImageGalleryItem extends Component {
  state = {
    isShowModal: false,
  };

  toggleShowImage = () => {
    this.setState(prevState => ({
      isShowModal: !prevState.isShowModal,
    }));
  };

  render() {
    const { image } = this.props;
    const { isShowModal } = this.state;

    return (
      <>
        <Item className="gallery-item">
          <ItemImage
            src={image.webformatURL}
            alt={image.tags}
            style={{ height: 100 }}
            onClick={this.toggleShowImage}
          />
        </Item>

        {isShowModal && (
          <ModalWindow image={image} toggleShowImage={this.toggleShowImage} />
        )}
      </>
    );
  }
}

export default ImageGalleryItem;
