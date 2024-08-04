// todo кнопка і спінер вилітають за межі body при натисканні кнопки Load More. Треба зробити прокручування, чи щось таке до самого низу, щоби їх було видно

import React, { Component } from "react";
import ImageGalleryV2 from "components/ImageGallery/ImageGallery_v2";
import SearchBar from "components/SearchBar";

class App extends Component {
  state = {
    query: "",
  };

  setQuery = query => {
    this.setState({ query });
  };

  render() {
    const { query } = this.state;

    return (
      <>
        <SearchBar onSetQuery={this.setQuery} />
        <ImageGalleryV2 query={query} />
      </>
    );
  }
}

export default App;
