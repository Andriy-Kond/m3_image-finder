import React, { Component } from "react";

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
      <header className="searchbar">
        <form className="form" onSubmit={this.onSubmit}>
          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={this.changeQuery}
          />
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>
        </form>
      </header>
    );
  }
}

export default SearchBar;
