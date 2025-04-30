import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { SetCookies } from "../../CustomFunctions/HandleCookies";
import Cookies from "js-cookie";

const SmallResolution = () => {
  const initialCookie = Cookies.get("small-resolution-warning");
  const [warningCookie, setWarningCookie] = useState(
    initialCookie
      ? JSON.parse(initialCookie)
      : { warningNum: 0, displayWarning: true }
  );

  const [warning, setWarning] = useState(true);
  const [showWarningDisplay, setShowWarningDisplay] = useState(true);

  const handleWarning = () => {
    setWarning(false);

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);

    const newWarningCookie = { ...warningCookie };

    if (warningCookie.warningNum === 0) {
      newWarningCookie.warningNum = 1;
    } else {
      newWarningCookie.warningNum += 1;
    }

    if (!showWarningDisplay) {
      newWarningCookie.displayWarning = false;
    }

    SetCookies("small-resolution-warning", newWarningCookie, expirationDate);
    setWarningCookie(newWarningCookie);
  };

  const renderWarningDisplay = () => {
    if (warningCookie.displayWarning) {
      return (
        <div
          className={`
          absolute top-0 left-0 w-full h-full z-50
          text-gray-100 bg-gray-600
          flex flex-col items-center justify-center text-center
          ${!warning ? "hidden" : ""}
        `}
        >
          <h1 className="!text-yellow-400">WARNING</h1>
          <h2>Your screen&apos;s width is to small.</h2>
          <p className="!text-red-600">(less than 300px)</p>
          <h4>Some elements on the page may display incorrectly.</h4>
          {warningCookie.warningNum >= 3 && (
            <Form>
              <Form.Check
                type="checkbox"
                label="Ignore these warnings?"
                onChange={() => {
                  setShowWarningDisplay(false);
                }}
              />
            </Form>
          )}
          <Button variant="success" onClick={handleWarning}>
            I understand
          </Button>
        </div>
      );
    } else {
      return null;
    }
  };

  return renderWarningDisplay();
};

export default SmallResolution;
