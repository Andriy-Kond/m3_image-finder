import React, { Component } from "react";
import ImageGalleryItem from "components/ImageGalleryItem";

class ImageGallery extends Component {
  render() {
    const { imagesList } = this.props;

    return (
      <>
        <ul className="gallery">
          {imagesList.map(image => (
            <ImageGalleryItem image={image} key={image.id} />
          ))}
        </ul>
      </>
    );
  }
}

export default ImageGallery;
