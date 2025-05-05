import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

import { userContext, tokenContext } from "../../CustomContexts/Contexts";
import { SetCookies } from "../../CustomFunctions/HandleCookies";

import { Loading } from "../../CustomFunctions/Loading/Loading";

const API = import.meta.env.VITE_PUBLIC_API_BASE;

export const Signin = ({ handleSignUpClick, handleAuthModalClose }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { setAuthUser } = useContext(userContext);
  const { setAuthToken } = useContext(tokenContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const existingUser = {
      email,
      password,
    };

    if (existingUser.password === "" || existingUser.email === "") {
      return toast.error("Please make sure to fill out all fields.", {
        containerId: "toast-notify",
      });
    }

    setIsLoading(true);
    setError("");

    await axios
      .post(`${API}/users/signin`, existingUser)
      .then((res) => {
        notify(res.data);
        handleAuthModalClose();

        setAuthUser(res.data.payload);
        setAuthToken(res.data.token);

        SetCookies("authUser", res.data.payload, 30);
        SetCookies("authToken", res.data.token, 30);
      })
      .catch((err) => {
        setError(err.response.data);
        console.log(err.response.data);
        notify();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const notify = (userData) => {
    if (error.includes("No user") || userData === undefined) {
      return toast.error(
        "No user with those credentials have been found. \n Please make sure your email and password are correct.",
        {
          containerId: "toast-notify",
        }
      );
    } else if (error !== "") {
      return toast.error(
        `An error occurred while signing in: ${error} Please try again later.`,
        {
          containerId: "toast-notify",
        }
      );
    }

    toast.success(
      `Welcome ${userData.payload.username}, You have been signed in.`,
      {
        containerId: "toast-notify",
      }
    );
    setTimeout(() => {
      setAuthUser(userData.payload);
      setAuthToken(userData.token);
      window.location.reload();
    }, 4100);
    return clearFields();
  };

  const clearFields = () => {
    setPassword("");
    setEmail("");
  };

  const renderSigninForm = () => {
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
          <Button variant="primary" type="submit">
            Sign In
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
          Don&apos;t have an account?{" "}
          <span
            className="text-blue-600 mt-4 underline cursor-pointer hover:text-blue-500"
            onClick={() => {
              handleSignUpClick();
            }}
          >
            Sign Up
          </span>
        </p>

        {isLoading ? <Loading message="Signing in..." /> : null}
      </div>
    );
  };

  return renderSigninForm();
};
