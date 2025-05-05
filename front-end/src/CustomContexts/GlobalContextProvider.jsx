import { useState } from "react";
import PropTypes from "prop-types";

import { GetCookies } from "../CustomFunctions/HandleCookies";

import {
  themeContext,
  userContext,
  tokenContext,
  errorContext,
} from "./Contexts";

const GlobalContextProvider = ({ children }) => {
  const themeStateCookie = GetCookies("theme") || null;
  const [themeState, setThemeState] = useState(themeStateCookie);
  const [authUser, setAuthUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [error, setError] = useState("");

  return (
    <themeContext.Provider value={{ themeState, setThemeState }}>
      <userContext.Provider value={{ authUser, setAuthUser }}>
        <tokenContext.Provider value={{ authToken, setAuthToken }}>
          <errorContext.Provider value={{ error, setError }}>
            {children}
          </errorContext.Provider>
        </tokenContext.Provider>
      </userContext.Provider>
    </themeContext.Provider>
  );
};

GlobalContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalContextProvider;
