import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();


const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

// here children represent whatever we are going to surround with the Provider at App.js
export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  // Get search results
  const searchUsers = async (text) => {
    setLoading()

    const queryParams = new URLSearchParams({
      q: text
    })

    const response = await fetch(`${GITHUB_URL}/search/users?${queryParams}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    })

    // instead of data
    const {items} = await response.json()

    dispatch({
      type: 'GET_USERS',
      payload: items,
    })
  }

  // clear users from search (state)
  const clearUsers = () => {
    dispatch({ type: 'CLEAR_USERS' })
  }

  // Function to set loading because loading is only update via Reducer
  const setLoading = () => dispatch({type: 'SET_LOADING'})

  return <GithubContext.Provider value={{
    users: state.users,
    loading: state.loading,
    searchUsers,
    clearUsers,
  }}>
    {children}
  </GithubContext.Provider>
}

export default GithubContext