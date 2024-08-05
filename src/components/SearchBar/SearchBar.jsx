import React, { Component } from "react";
import {
  Header,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
} from "./SearchBar.styled";

import { MdOutlineImageSearch } from "react-icons/md";

class SearchBar extends Component {
  state = {
    query: "",
  };

  changeQuery = e => {
    this.setState({ query: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSetQuery(this.state.query);
    this.setState({ query: "" });
  };

  render() {
    const { query } = this.state;

    return (
      <Header>
        <SearchForm onSubmit={this.onSubmit}>
          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={this.changeQuery}
          />
          <SearchFormBtn type="submit">
            <MdOutlineImageSearch
              style={{ width: "100%", height: "100%", fill: "blue" }}
            />
          </SearchFormBtn>
        </SearchForm>
      </Header>
    );
  }
}

export default SearchBar;
