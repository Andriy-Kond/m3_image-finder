import React, { Component } from "react";

class ImageGalleryItem extends Component {
  render() {
    const { image } = this.props;

    return (
      <li className="gallery-item">
        <img
          src={image.webformatURL}
          alt={image.tags}
          style={{ height: 100 }}
        />
      </li>
    );
  }
}

export default ImageGalleryItem;
