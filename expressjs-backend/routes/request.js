const express = require("express");

const router = express.Router();

const dotenv = require("dotenv");

dotenv.config();

const { OAuth2Client } = require("google-auth-library");

router.post("/", async function (req, res, next) {

  console.log("ENTERED OATH SHIT");

  res.header("Access-Control-Allow-Origin", "http://localhost:3000");

  res.header("Referrer-Policy", "no-referrer-when-downgrade"); // needed for http

  const redirectUrl = "https://127.0.0.1:8000/oath";

  const oAuth2Client = new OAuth2Client(

    process.env.CLIENT_ID,

    process.env.CLIENT_SECRET,

    redirectUrl

  );

  const authorizeUrl = oAuth2Client.generateAuthUrl({

    access_type: "offline",

    scope: "https://www.googleapis.com/auth/userinfo.profile openid",

    prompt: "consent",

  });

  res.json({ url: authorizeUrl });

});

module.exports = router;