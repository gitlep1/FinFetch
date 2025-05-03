import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Image } from "react-bootstrap";
import Cookies from "js-cookie";

export const Homepage = () => {
  const navigate = useNavigate();
  const [timeOfDay, setTimeOfDay] = useState("");

  const userData = Cookies.get("authUser") || null;

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setTimeOfDay("Good Morning");
    } else if (currentHour < 18) {
      setTimeOfDay("Good Afternoon");
    } else {
      setTimeOfDay("Good Evening");
    }
  }, []);

  return (
    <div className="flex flex-col align-center justify-center h-[50dvh] w-50 mx-auto my-0">
      {userData !== null && JSON.parse(userData).profileimg !== "" && (
        <Image
          src={JSON.parse(userData).profileimg}
          className="w-25 align-self-center"
        />
      )}
      <h1 className="!text-5xl">
        {timeOfDay}, {userData !== null ? JSON.parse(userData).username : null}
        <br />
        Welcome to FinFetch!
      </h1>
      <p>Your personalized finance experience starts here. Enjoy your stay!</p>
      <Button
        className="!text-2xl"
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        Get Started
      </Button>
    </div>
  );
};
