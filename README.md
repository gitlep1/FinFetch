# FinFetch 📈

FinFetch is a sleek, responsive stock price dashboard built with **React**, **JavaScript**, and **Tailwind CSS**. It fetches real-time stock data from a free financial API and displays it in a clean, user-friendly table layout. FinFetch also includes a user authentication system for a personalized experience.

![FinFetch Screenshot](./screenshot.png)

## 🚀 Live Demo

👉 [Live App](https://your-deployed-site.vercel.app)

---

## 🛠 Tech Stack

- **Frontend**: React + JavaScript
- **Backend**: Node.js, express
- **Database**: PostgreSQL
- **Styling**: Tailwind CSS
- **Data**: Free stock API Alpha Vantage
- **Deployment**: Vercel
- **Authentication**: Google Oauth 2.0

---

## 🔑 Features

### ✅ Core Features

- 📊 Fetch and display stock data in a dynamic table
  - Symbol
  - Current price
  - Change percentage
- 🎨 Responsive design using Tailwind CSS
- 🌐 Deployed for public access
- 🔐 User account system to manage personalized experience

### ✨ Bonus Features

- ⏳ Loading spinner while fetching data
- 📉 Stock chart using Chart.js
- 🔍 Search and/or sort functionality in the table
- ⚠️ Graceful error handling if the API fails
- 🧠 Clean UI/UX and reusable components

---

## 📦 Getting Started

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/FinFetch.git
cd FinFetch

# Install dependencies
cd front-end
npm install

cd ../back-end
npm install
```

### 2. Set up your back-end .env file

```bash
cd back-end
touch .env
```

```bash
PORT=<"your port if not 4000">
PG_HOST=<"your host if not localhost">
PG_DATABASE=<"your database name">
PG_USER=<"your postgres user if not postgres">
PG_PASSWORD=<"Your postgres password">
PG_PORT=<"your port if not 5432">

JWT_SECRET=<"Your json web token secret">

GMAIL_HOST="smtp.gmail.com"
GMAIL_EMAIL=<"Your email">
CLIENT_ID=<"Your google app client id">
CLIENT_SECRET=<"Your google app client secret">
REFRESH_TOKEN=<"Your google app refresh token">

REDIRECT_URI="http://<your url here if not localhost:4000>/oauth/oauth2callback"

IMGUR_CLIENT_ID=<"Your imgur client id">
IMGUR_CLIENT_SECRET=<"Your imgur client secret">
```

### 3. Set up your front-end .env file

```bash
cd front-end
touch .env
```

```bash
VITE_PUBLIC_API_BASE=<"your url here if not localhost:4000">
VITE_API_KEY_AV=<"Your alpha vantage API KEY">
VITE_BASE_URL="https://www.alphavantage.co/query"
```

### 4. Run the back-end development server

```bash
npm start
```

### 5. Run the front-end development server

```bash
npm run dev
```

## 📁 Project Structure

### Frontend (/front-end)

```bash
front-end/
  ├── src/
    ├── assets/               # Static files
    ├── components/           # Reusable React components
    │   ├── About/
    │   ├── Account/
    │   ├── Dashboard/
    │   ├── Homepage/
    │   ├── Navbar.jsx
    │   ├── NotFound.jsx
    │   └── CustomComponents/
    ├── CustomFunctions/      # Utility functions/hooks
    ├── App.jsx               # Main app layout and routing
    ├── main.jsx              # React entry point
    ├── main.css              # Imported Tailwind styles
  ├── .env
```

### Backend (/back-end)

```bash
back-end/
├── controllers/          # Route logic
├── db/                   # DB connection and setup
├── queries/              # SQL queries
├── Utils/                # Utility functions
├── validation/           # Input validation
├── .env
├── index.js              # Server entry point
├── vercel.json           # Deployment config
```

## 🚀 Deployment

This app can be deployed easily with:

- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)

Example:

```bash
npm run build
vercel deploy
```

## 🧪 Future Improvements

- User watchlists & favoriting
- Real-time updates via WebSockets
- Notifications for price alerts

## 💡 Inspiration

This project was built as a practical dashboard to track stock prices in real-time using modern web technologies. It serves as both a functional tool and a front-end showcase for React and Tailwind CSS integration.

## 📄 License

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0)**.

You are free to:

- Use and modify the code for **personal and non-commercial** projects.
- Share the code with others **with proper credit**.

However, **commercial use is not allowed without explicit permission**.  
If you wish to use this project in a commercial setting or monetize it in any way, **please contact me to discuss licensing terms**.

[View Full License](https://creativecommons.org/licenses/by-nc/4.0/)
