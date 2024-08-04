import React, { Component } from "react";
import Modal from "components/Modal";

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
        <li className="gallery-item">
          <img
            src={image.webformatURL}
            alt={image.tags}
            style={{ height: 100 }}
            onClick={this.toggleShowImage}
          />
        </li>

        {isShowModal && (
          <Modal image={image} toggleShowImage={this.toggleShowImage} />
        )}
      </>
    );
  }
}

export default ImageGalleryItem;
