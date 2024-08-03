import React, { Component } from "react";
import ImageGallery from "components/ImageGallery";
import SearchBar from "components/SearchBar";
import searchAPI from "services/searchAPI";
import Button from "components/Button";

class App extends Component {
  state = {
    imagesList: [],
    total: null,
    totalHits: null,
    page: 1,
    query: "",
  };

  onSearchImage = async query => {
    query !== this.state.query && this.setState({ page: 1, query });

    const { hits, total, totalHits } = await searchAPI.fetchImage(
      query,
      this.state.page,
    );

    this.setState(prevState => ({
      imagesList: [...prevState.imagesList, ...hits],
      total,
      totalHits,
      page: prevState.page + 1,
    }));
  };

  loadMoreBtn = async () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    await this.onSearchImage(this.state.query);
  };

  render() {
    const { imagesList } = this.state;

    return (
      <>
        <SearchBar onSearchImage={this.onSearchImage} />
        <ImageGallery imagesList={imagesList} />
        <Button onLoadMore={this.loadMoreBtn} />
      </>
    );
  }
}

export default App;
