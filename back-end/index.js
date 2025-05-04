const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const http = require("http");

const usersController = require("./controllers/usersController");
const emailAuthController = require("./controllers/emailAuthController");
const imageUploaderController = require("./controllers/imageUploaderController");
const newsController = require("./controllers/newsController");
const oauthRouter = require("./Utils/oauthRoutes");

const PORT = process.env.PORT || 5173;

const allowedOrigins = [
  "http://localhost:5173",
  "https://fin-fetch.vercel.app",
  "http://localhost:4000",
  "https://fin-fetch-api.vercel.app",
];

app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.ALLOW_OAUTH_SETUP === "true") {
  console.log("✅ OAuth setup routes are ENABLED.");
  app.use("/oauth", oauthRouter);
} else {
  console.log("OAuth setup routes are DISABLED.");
}

// === Account Routes === \\
app.use("/email", emailAuthController);
app.use("/users", usersController);

// === Image Routes === \\
app.use("/images", imageUploaderController);

// === News Routes === \\
app.use("/news", newsController);

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (username === adminUsername && password === adminPassword) {
    res.send("✅ Login successful! Welcome, Admin.");
  } else {
    res.status(401).send("Invalid username or password.");
  }
});

app.get("/", (req, res) => {
  res.send(`
  <h1>FinFetch</h1>

  <form method="post" action="/login">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" placeholder="username" required />

      <label for="password">Password:</label>
      <input type="password" id="password" name="password" placeholder="password" required />

      <button type="submit">Submit</button>
    </form>
  `);
});

app.get(/(.*)/, (req, res) => {
  res
    .status(404)
    .send(
      "GET OUT OF HERE OR YOUR MONEY WILL MAGICALLY BE USED TO INVEST IN THE WORST STOCK ... worldcom"
    );
});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`✅ FinFetch is running on port ${PORT}`);

  if (process.env.ALLOW_OAUTH_SETUP === "true") {
    console.log(
      `Maps to http://localhost:${PORT}/oauth/authorize to perform initial Google OAuth authorization.`
    );
  }
});

module.exports = app;
