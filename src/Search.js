import React from "react";
import { useGlobalContext } from "./Context";

const Search = () => {
  const { query, searchNews } = useGlobalContext();
  return (
    <>
      <div className="search">
        <h1> Technical news </h1>
        <form>
          <div className="head_input">
            <h2> Search tech related topic </h2>
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={(event) => searchNews(event.target.value)}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Search;
