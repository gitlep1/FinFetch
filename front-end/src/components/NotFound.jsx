import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>404</h1>
      <p>Page not found</p>
      <Button variant="primary" onClick={handleGoBack}>
        Go back
      </Button>
    </div>
  );
};
