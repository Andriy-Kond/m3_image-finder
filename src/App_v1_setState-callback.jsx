import React, { Component, createRef } from "react";
import { Notify } from "notiflix/build/notiflix-notify-aio";

import { Container } from "./App.styled";
import ImageGalleryV1 from "components/ImageGallery/ImageGallery_v1";
import SearchBar from "components/SearchBar";
import searchAPI from "services/searchAPI";
import Button from "components/Button";
import Loader from "components/Loader";

Notify.init({
  timeout: 3000,
  clickToClose: true,
  cssAnimationStyle: "from-right",
});

class App extends Component {
  constructor(props) {
    super(props);
    this.loadMoreBtnRef = createRef(); // Додавання посилання на кнопку "Load More"
  }

  state = {
    query: "",
    imagesList: [],
    totalHits: null,
    page: 1,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { imagesList, isLoading } = this.state;

    // Прокрутка вниз, якщо додані нові зображення, або показується loading
    if (imagesList.length > prevState.imagesList.length || isLoading) {
      if (this.loadMoreBtnRef.current) {
        this.loadMoreBtnRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  }

  // Дії при кліку на кнопку Search (новий пошук)
  searchBtn = async query => {
    this.setState({ page: 1, imagesList: [], query }, () => {
      this.onSearchImage(query);
    });
  };

  // Дії при кліку на кнопку Load More (додавання сторінки до існуючого пошуку)
  loadMoreBtn = e => {
    e.target.blur(); // зняття фокусу з кнопки, щоб ховер знов працював.

    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      () => this.onSearchImage(this.state.query),
    );
  };

  onSearchImage = async query => {
    this.setState({ isLoading: true });

    setTimeout(async () => {
      const result = await this.fetchImages(query);
      this.updateState(result);
    }, 300);
  };

  // Функція для виконання запиту на сервер:
  fetchImages = async query => {
    try {
      const { hits, totalHits } = await searchAPI.fetchImage(
        query,
        this.state.page,
      );

      return { hits, totalHits };
    } catch (error) {
      Notify.failure(`Error: ${error.message}`);
      this.setState({ isLoading: false });
    }
  };

  // Функція для оновлення стану за результатами запиту на сервер
  updateState = ({ hits, totalHits }) => {
    this.setState(
      prevState => {
        return {
          imagesList:
            this.state.page === 1
              ? [...hits]
              : [...prevState.imagesList, ...hits],
          totalHits,
          isLoading: false,
        };
      },
      () => {
        // Обробка повідомлень
        const { imagesList, totalHits, page } = this.state;
        const remainsItems = totalHits - imagesList.length;
        if (totalHits > 0 && page === 1) {
          Notify.success(`We found ${totalHits} images!`, { timeout: 2000 });
        }

        if (totalHits === 0) {
          Notify.info(`Sorry we not found any images with this request`);
        } else {
          if (remainsItems === 0) {
            Notify.info(`It's all that we have by this request.`);
          }
        }
      },
    );
  };

  render() {
    const { imagesList, totalHits, isLoading } = this.state;
    const remainsItems = totalHits - imagesList.length;
    const isDisabledLoadMoreBtn = remainsItems === 0;

    return (
      <Container>
        <SearchBar onSetQuery={this.searchBtn} />
        <ImageGalleryV1 imagesList={imagesList} />

        {isLoading && <Loader />}
        {imagesList.length > 0 && (
          <Button
            onLoadMore={this.loadMoreBtn}
            isDisabledLoadMoreBtn={isDisabledLoadMoreBtn}
            ref={this.loadMoreBtnRef}
          />
        )}
      </Container>
    );
  }
}

export default App;
