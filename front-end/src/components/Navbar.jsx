import { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Image, Breadcrumb, Button, Modal } from "react-bootstrap";
import { IoIosSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";

import { GetCookies, SetCookies } from "../CustomFunctions/HandleCookies";
import { themeContext } from "../CustomContexts/Contexts";

import Leon from "../assets/images/Leon.png";

import { Signout } from "../components/Account/Signout";
import { Signup } from "../components/Account/Signup";
import { Signin } from "../components/Account/Signin";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userData = GetCookies("authUser") || null;

  const { themeState, setThemeState } = useContext(themeContext);

  const [activeHome, setActiveHome] = useState(true);
  const [activeDashboard, setActiveDashboard] = useState(false);
  const [activeAbout, setActiveAbout] = useState(false);
  const [activeAccountSettings, setActiveAccountSettings] = useState(false);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSignoutModal, setShowSignoutModal] = useState(false);
  const [isSignin, setIsSignin] = useState(true);

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveHome(true);
      setActiveDashboard(false);
      setActiveAbout(false);
      setActiveAccountSettings(false);
    } else if (location.pathname === "/dashboard") {
      setActiveHome(false);
      setActiveDashboard(true);
      setActiveAbout(false);
      setActiveAccountSettings(false);
    } else if (location.pathname === "/about") {
      setActiveHome(false);
      setActiveDashboard(false);
      setActiveAbout(true);
      setActiveAccountSettings(false);
    } else if (location.pathname === "/account-settings") {
      setActiveHome(false);
      setActiveDashboard(false);
      setActiveAbout(false);
      setActiveAccountSettings(true);
    }
  }, [location]);

  const handleAuthModalShow = () => {
    setShowAuthModal(true);
  };

  const handleAuthModalClose = () => {
    setShowAuthModal(false);
  };

  const handleSignoutModalShow = () => {
    setShowSignoutModal(true);
  };

  const handleSignoutModalClose = () => {
    setShowSignoutModal(false);
  };

  const toggleForm = () => setIsSignin(!isSignin);

  const renderAuthModal = () => {
    return (
      <Modal show={showAuthModal} onHide={handleAuthModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isSignin ? "Sign In" : "Sign Up"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isSignin ? (
            <Signin
              handleSignUpClick={toggleForm}
              handleAuthModalClose={handleAuthModalClose}
            />
          ) : (
            <Signup
              handleSignUpClick={toggleForm}
              handleAuthModalClose={handleAuthModalClose}
            />
          )}
        </Modal.Body>
      </Modal>
    );
  };

  const handleThemeCookie = () => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 365);

    if (themeState === "dark") {
      SetCookies("theme", "light", expirationDate);
      setThemeState("light");
    } else {
      SetCookies("theme", "dark", expirationDate);
      setThemeState("dark");
    }
  };

  return (
    <div>
      <nav
        className={`
          min-w-screen grid grid-cols-1 place-items-center 
          gap-y-3 py-3 px-6
          sm:flex sm:flex-row sm:justify-between sm:items-center sm:h-20 sm:px-4
          md:flex md:flex-row md:justify-between md:items-center md:h-20 md:px-10
          ${
            themeState === "dark"
              ? "bg-gray-900 text-white"
              : "bg-white text-black"
          }
          `}
      >
        <div className="flex items-center">
          <Image src={Leon} alt="Leon-logo" className="w-10 h-10" />
          <h1 className="text-2xl font-bold">FinFetch</h1>
        </div>
        {userData ? (
          <div className="flex items-center sm:space-x-2">
            <Image
              src={userData.profileimg}
              alt="User Avatar"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => {
                navigate("/account-settings");
              }}
            />
            <p className="mt-2">{userData.username}</p>
            <Button variant="danger" onClick={handleSignoutModalShow}>
              Logout
            </Button>
          </div>
        ) : (
          <Button variant="success" onClick={handleAuthModalShow}>
            Login
          </Button>
        )}
      </nav>
      <div
        className={`flex justify-between min-w-screen ${
          themeState === "dark" ? "bg-gray-900" : "bg-white"
        }`}
      >
        <Breadcrumb className="flex justify-start items-center ml-2">
          <Breadcrumb.Item
            active={activeHome}
            onClick={() => {
              navigate("/");
            }}
          >
            <span
              className={`${
                themeState === "dark"
                  ? activeHome
                    ? "text-red-600"
                    : null
                  : activeHome
                  ? "text-green-600"
                  : null
              }`}
            >
              Home
            </span>
          </Breadcrumb.Item>
          <Breadcrumb.Item
            active={activeDashboard}
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            <span
              className={`${
                themeState === "dark"
                  ? activeDashboard
                    ? "text-red-600"
                    : null
                  : activeDashboard
                  ? "text-green-600"
                  : null
              }`}
            >
              Dashboard
            </span>
          </Breadcrumb.Item>
          {userData ? (
            <Breadcrumb.Item
              active={activeAccountSettings}
              onClick={() => {
                navigate("/account-settings");
              }}
            >
              <span
                className={`${
                  themeState === "dark"
                    ? activeAccountSettings
                      ? "text-red-600"
                      : null
                    : activeAccountSettings
                    ? "text-green-600"
                    : null
                }`}
              >
                Account Settings
              </span>
            </Breadcrumb.Item>
          ) : null}
          <Breadcrumb.Item
            active={activeAbout}
            onClick={() => {
              navigate("/about");
            }}
          >
            <span
              className={`${
                themeState === "dark"
                  ? activeAbout
                    ? "text-red-600"
                    : null
                  : activeAbout
                  ? "text-green-600"
                  : null
              }`}
            >
              About
            </span>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="flex items-center mr-2">
          <div
            onClick={() => handleThemeCookie()}
            className={`relative w-12 h-6 flex items-center rounded-full cursor-pointer transition-colors duration-300 ${
              themeState === "dark"
                ? "bg-neutral-800 border border-white"
                : "bg-gray-300 border border-black"
            }`}
          >
            <div
              className={`absolute w-5 h-5 rounded-full transition-transform duration-300 ${
                themeState === "dark"
                  ? "translate-x-[25px] bg-white"
                  : "translate-x-0.5 bg-black"
              }`}
            />
            <FaMoon className="absolute left-1 text-white text-sm" />
            <IoIosSunny className="absolute right-1 text-yellow-500 text-sm" />
          </div>
        </div>
      </div>

      {renderAuthModal()}

      <Signout
        showSignoutModal={showSignoutModal}
        handleSignoutModalClose={handleSignoutModalClose}
      />
    </div>
  );
};
