import React, { useEffect } from "react";
import { useGlobalContext } from "./Context";

const Stories = () => {
  const { hits, nbPages, isLoading, removePost } = useGlobalContext();

  if (isLoading) {
    return (
      <>
        <h1
          style={{
            textAlign: "center",
            fontSize: "3rem",
            position: "relative",
          }}
        >
          Loading...
        </h1>
      </>
    );
  }

  return (
    <>
      <div className="stories">
        {hits.map((cur) => {
          const { title, author, objectID, url, num_comments } = cur;
          return (
            <div className="news_box" key={objectID}>
              <div className="removeBtn">
                <a href="#" onClick={() => removePost(objectID)}>
                  x
                </a>
              </div>
              <h1>{title}</h1>
              <p>
                By <span> {author} </span> | <span> {num_comments} </span>
                comments
              </p>
              <div className="stories_link">
                <a className="link" href={url} target="_blank">
                  Read more
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Stories;
