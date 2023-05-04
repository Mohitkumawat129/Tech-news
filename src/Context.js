import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";

const API_URL = "http://hn.algolia.com/api/v1/search?";

const initialState = {
  isLoading: true,
  query: "HTML",
  nbPages: 0,
  page: 0,
  hits: [],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchApiData = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      dispatch({
        type: "GET_STORIES",
        payload: {
          //payload give extra information to reducer method
          hits1: data.hits,
          nbPages1: data.nbPages,
          //hits and nbPages are just variables not what we have in api  which will be passed to action method
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  // To remove post
  const removePost = (post_ID) => {
    dispatch({ type: "REMOVE_POST", payload: post_ID });
  };
  // To search news
  const searchNews = (search) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: search,
    });
  };
  // Pagination
  const getNextPage = () => {
    dispatch({
      type: "NEXT_PAGE",
    });
  };
  const getPrevPage = () => {
    dispatch({
      type: "PREV_PAGE",
    });
  };
  useEffect(() => {
    let timeOut = setTimeout(() => {
      fetchApiData(`${API_URL}query=${state.query}&page=${state.page}`);
    }, 800);
    return () => clearTimeout(timeOut);
  }, [state.query, state.page]);
  //state.query and state.page are used in dependency to change data when we search or click on next or prev button

  return (
    <AppContext.Provider
      value={{ ...state, removePost, searchNews, getNextPage, getPrevPage }}
    >
      {children}
    </AppContext.Provider>
  );
};

//custom hook

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
