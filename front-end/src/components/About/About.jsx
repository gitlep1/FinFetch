import { useContext } from "react";

import { themeContext } from "../../CustomContexts/Contexts";

export const About = () => {
  const { themeState } = useContext(themeContext);

  return (
    <div
      className={`min-w-screen min-h-screen ${
        themeState === "dark" ? "bg-white text-black" : "bg-gray-900 text-white"
      }`}
    >
      <div className={`w-50 mx-auto px-4 py-10`}>
        <h1 className="text-3xl font-bold mb-4">About FinFetch</h1>
        <p className="mb-6">
          FinFetch is a lightweight, responsive stock dashboard built using
          React, JavaScript, postgreSQL and Tailwind CSS. It allows users to
          view real-time stock data from a free public API like Finnhub or Alpha
          Vantage.
        </p>

        <p className="mb-6">
          The core functionality includes fetching and displaying key stock
          information in a clean, sortable table. Each stock entry shows its
          symbol, current price, and percentage change. The app is fully
          responsive and optimized for modern browsers.
        </p>

        <p className="mb-10">
          FinFetch is ideal for users who want a simple and fast way to monitor
          stock performance without unnecessary clutter or logins. No personal
          data is required to use the core features.
        </p>

        <hr className="my-8 border-gray-300" />

        <h2 className="text-2xl font-semibold mb-3">Privacy Policy</h2>
        <p className="mb-6">
          FinFetch does not collect or store any personally identifiable
          information. If you sign up to receive verification codes by email,
          your email address is used solely for that purpose and will never be
          shared with third parties.
        </p>

        <h2 className="text-2xl font-semibold mb-3">Terms of Service</h2>
        <p className="mb-6">
          By using FinFetch, you agree to use the application for personal,
          non-commercial purposes. The data provided is sourced from third-party
          APIs and is for informational purposes only. FinFetch does not
          guarantee the accuracy or completeness of the data.
        </p>
      </div>
    </div>
  );
};
