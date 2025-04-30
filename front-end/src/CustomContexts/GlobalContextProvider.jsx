import { useState } from "react";
import PropTypes from "prop-types";

import { userContext, tokenContext, errorContext } from "./Contexts";

const GlobalContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [error, setError] = useState("");

  return (
    <userContext.Provider value={{ authUser, setAuthUser }}>
      <tokenContext.Provider value={{ authToken, setAuthToken }}>
        <errorContext.Provider value={{ error, setError }}>
          {children}
        </errorContext.Provider>
      </tokenContext.Provider>
    </userContext.Provider>
  );
};

GlobalContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalContextProvider;
