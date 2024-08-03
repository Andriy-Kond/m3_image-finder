// import { MdOutlineImageSearch } from "react-icons/md";
// <MdOutlineImageSearch />

import React, { Component } from "react";
import ImageGallery from "components/ImageGallery";
import SearchBar from "components/SearchBar";
import searchAPI from "services/searchAPI";

class App extends Component {
  state = {
    imagesList: [],
    total: null,
    totalHits: null,
  };

  onSearchImage = async query => {
    const { hits, total, totalHits } = await searchAPI.fetchImage(query);
    this.setState({
      imagesList: hits,
      total,
      totalHits,
    });
  };

  render() {
    const { imagesList } = this.state;

    return (
      <>
        <SearchBar onSearchImage={this.onSearchImage} />
        <ImageGallery imagesList={imagesList} />
      </>
    );
  }
}

export default App;
