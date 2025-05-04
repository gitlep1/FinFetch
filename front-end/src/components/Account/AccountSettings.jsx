import { useState, useEffect, useContext } from "react";
import { Form, Button, Modal, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

import { themeContext } from "../../CustomContexts/Contexts";
import { GetCookies, SetCookies } from "../../CustomFunctions/HandleCookies";
import { Loading } from "../../CustomFunctions/Loading/Loading";

const API = import.meta.env.VITE_PUBLIC_API_BASE;

export const AccountSettings = () => {
  const { themeState } = useContext(themeContext);

  const tokenData = GetCookies("authToken") || null;

  const [userData, setUserData] = useState({});

  const [showModal, setShowModal] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileimg, setProfileimg] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userData || !tokenData) {
      window.location.href = "/";
    }
    getUserData();
  }, []); // eslint-disable-line

  const getUserData = async () => {
    await axios
      .get(`${API}/users/user`, {
        headers: {
          Authorization: `Bearer ${tokenData}`,
        },
      })
      .then((response) => {
        setUserData(response.data.payload);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const updateUserData = async (e) => {
    e.preventDefault();

    if (username.length > 15) {
      return toast.error(
        `Your current username:(${username}) is ${username.length} characters long. \n The max chracter length allowed is 12.`,
        {
          containerId: "toast-notify",
        }
      );
    }

    if (confirmPassword !== password) {
      return toast.error("Passwords do not match", {
        containerId: "toast-notify",
      });
    }

    const updatedUserData = {
      username: username || userData.username,
      email: email || userData.email,
      password: password || userData.password,
    };

    setIsLoading(true);

    await axios
      .put(`${API}/users/update`, updatedUserData, {
        headers: {
          Authorization: `Bearer ${tokenData}`,
        },
      })
      .then((response) => {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 30);
        SetCookies("authUser", response.data.payload, expirationDate);
        notify();
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const uploadProfileImage = async () => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("image", profileimg);

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    await axios
      .post(`${API}/images/upload`, formData, {
        headers: {
          Authorization: `Bearer ${tokenData}`,
        },
      })
      .then((res) => {
        console.log("uploadProfileImage -> res.data", res.data.payload);
        // const expirationDate = new Date();
        // expirationDate.setDate(expirationDate.getDate() + 30);
        // SetCookies("authUser", res.data.payload, expirationDate);
        // notify();
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const notify = () => {
    toast.success("Account updated successfully", {
      containerId: "toast-notify",
    });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const renderUpdateForm = () => {
    return (
      <Form onSubmit={updateUserData} className="w-full max-w-md mt-6">
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder={userData.username}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder={userData.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Change Profile Image</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formProfileImage">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setProfileimg(e.target.files[0])}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                // setShowModal(false);
                uploadProfileImage();
              }}
            >
              Upload
            </Button>

            {isLoading ? <Loading message="Uploading Image..." /> : null}
          </Modal.Footer>
        </Modal>

        {error && <p>{error}</p>}

        {isLoading ? <Loading message="Updating Profile Details..." /> : null}

        <Button className="w-[100%]" variant="primary" type="submit">
          Update
        </Button>
      </Form>
    );
  };

  return (
    <div
      className={`w-full min-h-screen flex flex-col gap-y-6 items-center justify-center p-6 ${
        themeState === "dark" ? "bg-white text-black" : "bg-gray-900 text-white"
      }`}
    >
      <h1>Account Settings</h1>
      <div className="relative">
        <Image
          src={userData.profileimg}
          alt="Profile"
          roundedCircle
          className="w-24 h-24 object-cover cursor-pointer"
          onClick={() => setShowModal(true)}
        />
        <span
          className="absolute bottom-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-full cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          Edit
        </span>
      </div>
      {renderUpdateForm()}
    </div>
  );
};
