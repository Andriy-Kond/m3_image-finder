import React, { Component } from "react";
import ImageGalleryItem from "components/ImageGalleryItem";
import { ImageGalleryList } from "./ImageGallery.styled";

class ImageGallery extends Component {
  render() {
    const { imagesList } = this.props;

    return (
      <>
        <ImageGalleryList>
          {imagesList.map(image => (
            <ImageGalleryItem image={image} key={image.id} />
          ))}
        </ImageGalleryList>
      </>
    );
  }
}

export default ImageGallery;
