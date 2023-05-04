import React from "react";
import { useGlobalContext } from "./Context";

const Pagination = () => {
  const { page, nbPages, getPrevPage, getNextPage } = useGlobalContext();
  return (
    <>
      <div className="pagination">
        <button onClick={() => getPrevPage()}>Prev</button>
        <p>
          {page + 1} of {nbPages}
        </p>
        {/* since page start from 0 in our api so we do page+1*/}
        <button onClick={() => getNextPage()}>Next</button>
      </div>
    </>
  );
};

export default Pagination;
