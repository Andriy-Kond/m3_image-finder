import Modal from "components/Modal";
import React, { Component } from "react";

class ImageGalleryItem extends Component {
  state = { largeImage: false };

  openImage = () => {
    this.setState({ largeImage: true });
  };

  render() {
    const { image } = this.props;
    const { largeImage } = this.state;

    return (
      <>
        <li className="gallery-item">
          <img
            src={image.webformatURL}
            alt={image.tags}
            style={{ height: 100 }}
            onClick={this.openImage}
          />
        </li>

        {largeImage && (
          <Modal largeImageURL={image.largeImageURL} alt={image.tags} />
        )}
      </>
    );
  }
}

export default ImageGalleryItem;
