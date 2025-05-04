import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

import defaultProfilePic from "../../assets/images/default-profile-pic.png";

import { Loading } from "../../CustomFunctions/Loading/Loading";

const API = import.meta.env.VITE_PUBLIC_API_BASE;

export const Signup = ({ handleSignUpClick, handleAuthModalClose }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      profilePic: defaultProfilePic,
      username,
      password,
      email,
    };

    if (newUser.username.length > 12) {
      return toast.error(
        `Your current username:(${newUser.username}) is ${newUser.username.length} characters long. \n The max chracter length allowed is 12.`,
        {
          containerId: "toast-notify",
        }
      );
    }

    if (
      newUser.username === "" ||
      newUser.password === "" ||
      newUser.email === ""
    ) {
      return toast.error("Please make sure to fill out all fields.", {
        containerId: "toast-notify",
      });
    }

    if (confirmPassword !== password) {
      return toast.error("Passwords do not match", {
        containerId: "toast-notify",
      });
    }

    setIsLoading(true);

    await axios
      .post(`${API}/email/send-verification`, newUser)
      .then(() => {
        clearFields();
        handleAuthModalClose();
        navigate("/email-verification", {
          state: {
            email: email,
            username: username,
            password: password,
          },
        });
      })
      .catch((err) => {
        const error = err;
        console.log({ error });

        return toast.error(
          error === "Email already exists."
            ? "ERROR: Email already taken."
            : "ERROR: Please try again. If this continues try again in a few hours as the server might be down.",
          {
            containerId: "toast-notify",
          }
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const clearFields = () => {
    setUsername("");
    setPassword("");
    setEmail("");
    setConfirmPassword("");
  };

  const renderSignupForm = () => {
    return (
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-xs text-gray-500">
              We&#39;ll never share your email with anyone else.
            </p>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Sign Up
          </Button>{" "}
          <Button
            variant="danger"
            onClick={() => {
              handleAuthModalClose();
            }}
          >
            Close
          </Button>
        </Form>
        <p className="text-center">
          Already have an account?{" "}
          <span
            className="text-blue-600 mt-4 underline cursor-pointer hover:text-blue-500"
            onClick={() => {
              handleSignUpClick();
            }}
          >
            Sign In
          </span>
        </p>

        {isLoading ? <Loading message="Signing up..." /> : null}
      </div>
    );
  };

  return renderSignupForm();
};
