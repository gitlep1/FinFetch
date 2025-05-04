import { useState, useEffect, useContext } from "react";
import { Navbar } from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

import { userContext, tokenContext } from "./CustomContexts/Contexts";
import CustomToastContainers from "./CustomFunctions/CustomToasts/CustomToastContainers";
import DetectScreenSize from "./CustomFunctions/DetectScreenSize";
import SmallResolution from "./CustomFunctions/SmallResolution/SmallResolution";

import { EmailVerification } from "./components/Account/EmailVerification";
import { AccountSettings } from "./components/Account/AccountSettings";
import { Homepage } from "./components/Homepage/Homepage";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { About } from "./components/About/About";
import { NotFound } from "./components/NotFound";

export const App = () => {
  const { setAuthUser } = useContext(userContext);
  const { setAuthToken } = useContext(tokenContext);

  const userData = Cookies.get("authUser") || null;
  const tokenData = Cookies.get("authToken") || null;

  const [screenSize, setScreenSize] = useState(DetectScreenSize().width);

  useEffect(() => {
    const checkScreenSizeInterval = setInterval(() => {
      setScreenSize(DetectScreenSize().width);
    }, 100);

    return () => {
      clearInterval(checkScreenSizeInterval);
    };
  }, []);

  useEffect(() => {
    handleReauthUser();
  }, []); // eslint-disable-line

  const handleReauthUser = () => {
    if (
      userData !== "undefined" &&
      userData !== null &&
      tokenData !== "undefined" &&
      tokenData !== null
    ) {
      setAuthUser(JSON.parse(userData));
      setAuthToken(JSON.parse(tokenData));
    } else {
      setAuthUser(null);
      setAuthToken(null);
    }
  };

  return (
    <section>
      <CustomToastContainers />
      {screenSize < 300 && <SmallResolution />}

      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/account-settings" element={<AccountSettings />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};
