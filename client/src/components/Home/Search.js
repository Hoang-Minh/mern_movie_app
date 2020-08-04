import React, { useState } from "react";
import SearchBar from "material-ui-search-bar";
import axios from "axios";
import { API_KEY } from "../Config";

function Search({ onTermSearch, onClearTerm }) {
  const [term, setTerm] = useState("");

  const onSearch = async (term) => {
    try {
      const query = term.split(" ").join("+");
      console.log(query);
      const endpoint = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
      const response = await axios.get(endpoint);
      console.log(response.data.results);
      onTermSearch(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SearchBar
      style={{ marginBottom: "1.5rem" }}
      placeholder="Search Movie"
      value={term}
      onChange={(newValue) => setTerm(newValue)}
      cancelOnEscape
      onRequestSearch={() => onSearch(term)}
      onCancelSearch={() => onClearTerm()}
    />
  );
}

export default Search;
