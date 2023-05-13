import { initializeApp } from "firebase/app";
const { getAuth } = require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyBVuaqHXUeHReE5pGfA4aUjUHJzQQCgokY",
  authDomain: "fit-fables.firebaseapp.com",
  projectId: "fit-fables",
  storageBucket: "fit-fables.appspot.com",
  messagingSenderId: "939114889146",
  appId: "1:939114889146:web:3199d5c3819f89f541a783",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

module.exports = app;
module.exports = { auth };

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6Lf2pQcmAAAAAGug9Vf7nt_pwB9HclBWTnnGhWbt"),
  isTokenAutoRefreshEnabled: true,
});
