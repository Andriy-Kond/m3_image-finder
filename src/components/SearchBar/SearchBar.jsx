import React, { Component } from "react";

class SearchBar extends Component {
  state = {
    filter: "",
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSearchImage(this.state.filter);
    this.setState({ filter: "" });
  };

  render() {
    const { filter } = this.state;

    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.onSubmit}>
          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={filter}
            onChange={this.changeFilter}
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
