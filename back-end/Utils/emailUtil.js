const fs = require("fs");
const path = require("path");

const { google } = require("googleapis");
const nodemailer = require("nodemailer");
require("dotenv").config();

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
const EMAIL = process.env.GMAIL_EMAIL;

const TOKEN_PATH = path.join(__dirname, "temp_tokens_for_setup.json");

const REDIRECT_URI =
  process.env.REDIRECT_URI || "http://localhost:4000/oauth/oauth2callback";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf8"));
console.log("✅ Tokens loaded from file:", tokens);
oAuth2Client.setCredentials(tokens);

// if (REFRESH_TOKEN) {
//   oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
//   console.log(
//     "✅ oAuth2Client initialized with refresh token from environment variables."
//   );
// } else {
//   console.warn(
//     "⚠️ GOOGLE_REFRESH_TOKEN not found in environment variables. OAuth flow needs to be performed."
//   );
// }

const createTransporter = async () => {
  try {
    const accessTokenResponse = await oAuth2Client.getAccessToken();

    if (!accessTokenResponse || !accessTokenResponse.token) {
      throw new Error(
        "❌ createTransporter -> Failed to retrieve access token"
      );
    }

    const accessToken = accessTokenResponse.token;
    console.log("✅ Access Token:", accessToken);

    console.log("✅ createTransporter -> Access Token Retrieved/Refreshed");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        type: "OAuth2",
        user: EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    console.log("======= transporter:", transporter);

    await transporter.verify();
    console.log("✅ Transporter successfully verified");

    return transporter;
  } catch (error) {
    console.error("❌ createTransporter -> Failed to create transporter:", {
      ERROR_TITLE: error.message,
      error: error,
    });
    return null;
  }
};

module.exports = { createTransporter };
