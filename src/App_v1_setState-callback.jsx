import React, { Component, createRef } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Container } from "./App.styled";
import ImageGalleryV1 from "components/ImageGallery/ImageGallery_v1";
import SearchBar from "components/SearchBar";
import searchAPI from "services/searchAPI";
import Button from "components/Button";
import Loader from "components/Loader";

class App extends Component {
  constructor(props) {
    super(props);
    this.loadMoreRef = createRef(); // Додаємо посилання на кнопку "Load More"
  }

  state = {
    query: "",
    imagesList: [],
    totalHits: null,
    page: 1,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    // Прокрутка вниз, якщо зображення додані, або показується loading
    if (
      this.state.imagesList.length > prevState.imagesList.length ||
      this.state.isLoading
    ) {
      if (this.loadMoreRef.current) {
        this.loadMoreRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  onSearchImage = async query => {
    this.setState({ isLoading: true });
    if (query !== this.state.query) {
      // ! Оновлення стану з колбеком (офіційний React підхід):
      this.setState({ page: 1, query, imagesList: [] }, async () => {
        // запит до API тільки після оновлення стану:
        const result = await this.fetchImages(query);
        this.setState(result);
      });
    } else {
      // Якщо запит не змінювався, одразу виконую запит
      const result = await this.fetchImages(query);
      this.setState(result);
    }
  };

  // Функція для оновлення стану за результатами запиту на сервер
  setState = ({ hits, totalHits }) => {
    this.setState(prevState => {
      return {
        imagesList:
          this.state.page === 1
            ? [...hits]
            : [...prevState.imagesList, ...hits],
        totalHits,
        isLoading: false,
      };
    });
  };

  // Функція для виконання запиту на сервер:
  fetchImages = async query => {
    try {
      const { hits, totalHits } = await searchAPI.fetchImage(
        query,
        this.state.page,
      );

      if (totalHits > 0) {
        toast.success(`We found ${totalHits} images!`);
      } else {
        toast.info(`Sorry we not found any images with this request`);
      }

      return { hits, totalHits };
    } catch (error) {
      console.log("error:::", error.message);
      toast.error(`error.massage`);
      this.setState({ isLoading: false });
    }
  };

  // Дії при кліку на кнопку Search (новий пошук)
  searchBtn = async query => {
    console.log("search btn");
    this.setState({ page: 1 }, async () => {
      await this.onSearchImage(query);
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

  render() {
    const { imagesList, totalHits, isLoading } = this.state;
    const remainsItems = totalHits - imagesList.length;
    const isDisabledLoadMoreBtn = remainsItems === 0;

    return (
      <>
        <ToastContainer autoClose={2000} transition={Slide} />
        <Container>
          <SearchBar onSetQuery={this.searchBtn} />
          <ImageGalleryV1 imagesList={imagesList} />

          {isLoading && <Loader />}
          {imagesList.length > 0 && (
            <Button
              onLoadMore={this.loadMoreBtn}
              isDisabledLoadMoreBtn={isDisabledLoadMoreBtn}
              ref={this.loadMoreRef}
            />
          )}
        </Container>
      </>
    );
  }
}

export default App;
