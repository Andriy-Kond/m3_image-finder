import React, { Component } from "react";
import ImageGallery from "components/ImageGallery";
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
        <ImageGallery query={query} />
      </>
    );
  }
}

export default App;
