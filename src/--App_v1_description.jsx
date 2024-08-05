// todo кнопка і спінер вилітають за межі body при натисканні кнопки Load More. Треба зробити прокручування, чи щось таке до самого низу, щоби їх було видно

import React, { Component } from "react";
import { Container } from "./App.styled";
import ImageGalleryV1 from "components/ImageGallery/ImageGallery_v1";
import SearchBar from "components/SearchBar";
import searchAPI from "services/searchAPI";
import Button from "components/Button";
import Loader from "components/Loader";

class App extends Component {
  state = {
    query: "",
    imagesList: [],
    totalHits: null,
    page: 1,
    isLoading: false,
  };

  // * -== Не правильний варіант -==
  // В такому варіанті буде непередбачувана поведінка, бо setState виконується асинхронно і керується React, а не JS(наприклад, може збирати декілька запитів і потім пушити їх за один захід для економії ресурсів). Тому треба або промісифікувати setState(щоби він повертав проміси) і додавати async - await, або виконувати усі умови в callback - ах, які йдуть другим аргументом у setState.Ще один варіант - перенести логіку в ImageGallery і там робити setState - ти за умовами в componentDidUpdate().

  // onSearchImage = async query => {
  //   this.setState({ isLoading: true });

  //   if (query !== this.state.query) {
  //     this.setState({ page: 1, query, imagesList: [] });
  //   }

  //   const { hits, totalHits } = await searchAPI.fetchImage(
  //     query,
  //     this.state.page,
  //   );

  //   this.setState(prevState => ({
  //     imagesList: [...prevState.imagesList, ...hits],
  //     totalHits,
  //     isLoading: false,
  //   }));
  // };
  // /-== Не правильний варіант -==

  //  * -== Промісифікація setState ==-
  onSearchImage = async query => {
    this.setState({ isLoading: true });
    if (query !== this.state.query) {
      // Тут використовується обгортка setState у проміс, щоб дочекатися завершення цього оновлення перед виконанням наступного коду.
      await new Promise(resolve => {
        this.setState({ page: 1, query, imagesList: [] }, resolve);
      });
    }

    // Тепер можна виконати запит з правильним значенням page
    const { hits, totalHits } = await searchAPI.fetchImage(
      query,
      this.state.page,
    );

    // Додаємо нові результати до списку зображень та вимикаємо isLoading
    this.setState(prevState => ({
      imagesList: [...prevState.imagesList, ...hits],
      totalHits,
      isLoading: false,
    }));
  };
  // /-== Промісифікація setState ==-

  // * -== Без промісифікації ==-
  //   onSearchImage = async query => {
  //   // Спочатку встановлюємо isLoading в true
  //   this.setState({ isLoading: true });

  //   // Перевіряємо, чи змінився запит
  //   if (query !== this.state.query) {
  //     // Оновлюємо стан з колбеком
  //     this.setState({ page: 1, query, imagesList: [] }, () => {
  //       // Виконуємо запит до API тільки після оновлення стану
  //       this.fetchImages(query);
  //     });
  //   } else {
  //     // Якщо запит не змінювався, одразу виконуємо запит
  //     this.fetchImages(query);
  //   }
  // };

  // // Функція для виконання запиту та оновлення стану
  // fetchImages = async query => {
  //   const { hits, totalHits } = await searchAPI.fetchImage(
  //     query,
  //     this.state.page,
  //   );

  //   // Оновлюємо стан після отримання даних
  //   this.setState(prevState => ({
  //     imagesList: [...prevState.imagesList, ...hits],
  //     totalHits,
  //     isLoading: false,
  //   }));
  // };
  // /-== Без промісифікації ==-

  loadMoreBtn = async () => {
    // setState асинхронна, але керує нею React, а не JS і вона не повертає проміс, тому не є чистою async-функцією.
    // Тому для виконання коду вже після оновлення стану необхідно цей код викликати у callback, що йде другим параметром setState. Такий API.
    // Якщо цього не зробити, то сторінка буде збільшуватись вже після виконання onSearchImage()
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
      <Container>
        <SearchBar onSetQuery={this.onSearchImage} />
        <ImageGalleryV1 imagesList={imagesList} />

        {isLoading && <Loader />}
        {imagesList.length > 0 && (
          <Button
            onLoadMore={this.loadMoreBtn}
            isDisabledLoadMoreBtn={isDisabledLoadMoreBtn}
          />
        )}
      </Container>
    );
  }
}

export default App;
