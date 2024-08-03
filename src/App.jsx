// todo кнопка і спінер вилітають за межі body при натисканні кнопки Load More. Треба зробити прокручування, чи щось таке до самого низу, щоби їх було видно

import React, { Component } from "react";
import ImageGallery from "components/ImageGallery";
import SearchBar from "components/SearchBar";
import searchAPI from "services/searchAPI";
import Button from "components/Button";
import Loader from "components/Loader";

class App extends Component {
  state = {
    imagesList: [],
    totalHits: null,
    page: 1,
    query: "",
    isLoading: false,
  };

  onSearchImage = async query => {
    this.setState({ isLoading: true });
    if (query !== this.state.query) {
      this.setState({ page: 1, query, imagesList: [] });
    }

    const { hits, totalHits } = await searchAPI.fetchImage(
      query,
      this.state.page,
    );

    this.setState(prevState => ({
      imagesList: [...prevState.imagesList, ...hits],
      totalHits,
      isLoading: false,
    }));
  };

  loadMoreBtn = async () => {
    // setState асинхронна, але керує нею React, а не JS і вона не повертає проміс, тому не є чистою async-функцією.
    // Тому для виконання коду вже після оновлення стану необхідно цей код викликати у callback, що йде другим параметром setState. Такий API.
    // Якщо цього не зробити, то сторінка буде збільшуватись вже після виконання onSearchImage()
    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      () => {
        this.onSearchImage(this.state.query);
      },
    );
  };

  render() {
    const { imagesList, totalHits, isLoading } = this.state;

    const remainsItems = totalHits - imagesList.length;

    const isDisabledLoadMoreBtn = remainsItems === 0;

    return (
      <>
        <SearchBar onSearchImage={this.onSearchImage} />
        <ImageGallery imagesList={imagesList} />

        {isLoading && <Loader />}
        {imagesList.length > 0 && (
          <Button
            onLoadMore={this.loadMoreBtn}
            isDisabledLoadMoreBtn={isDisabledLoadMoreBtn}
          />
        )}
      </>
    );
  }
}

export default App;
