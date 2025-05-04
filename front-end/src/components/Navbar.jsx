import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Image, Breadcrumb, Button, Modal, Form } from "react-bootstrap";

import { GetCookies } from "../CustomFunctions/HandleCookies";

import Leon from "../assets/images/Leon.png";

import { Signout } from "../components/Account/Signout";
import { Signup } from "../components/Account/Signup";
import { Signin } from "../components/Account/Signin";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userData = GetCookies("authUser") || null;

  const [activeHome, setActiveHome] = useState(true);
  const [activeDashboard, setActiveDashboard] = useState(false);
  const [activeAbout, setActiveAbout] = useState(false);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSignoutModal, setShowSignoutModal] = useState(false);
  const [isSignin, setIsSignin] = useState(true);

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveHome(true);
      setActiveDashboard(false);
      setActiveAbout(false);
    } else if (location.pathname === "/dashboard") {
      setActiveHome(false);
      setActiveDashboard(true);
      setActiveAbout(false);
    } else if (location.pathname === "/about") {
      setActiveHome(false);
      setActiveDashboard(false);
      setActiveAbout(true);
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

  return (
    <div>
      <nav className="w-full h-20 bg-gray-900 flex justify-between items-center px-10 nav-container">
        <div className="flex items-center">
          <Image src={Leon} alt="Leon-logo" className="w-10 h-10" />
          <h1 className="text-2xl font-bold text-white">FinFetch</h1>
        </div>
        {userData ? (
          <div className="flex items-center space-x-2">
            <Image
              src={userData.profileimg}
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <p className="text-white mt-2">{userData.username}</p>
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
      <div>
        <Breadcrumb className="flex justify-start items-center ml-2">
          <Breadcrumb.Item
            active={activeHome}
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item
            active={activeDashboard}
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Dashboard
          </Breadcrumb.Item>
          <Breadcrumb.Item
            active={activeAbout}
            onClick={() => {
              navigate("/about");
            }}
          >
            About
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      {renderAuthModal()}

      <Signout
        showSignoutModal={showSignoutModal}
        handleSignoutModalClose={handleSignoutModalClose}
      />
    </div>
  );
};
