/**
 * main.jsx
 * ---------------------------------------------------------------
 * Entry point. Wraps <App> in <GoogleOAuthProvider> so the Google
 * login button anywhere in the tree works.
 *
 * IMPORTANT: replace GOOGLE_CLIENT_ID below with your own OAuth
 * Client ID from Google Cloud Console — see README.md for the
 * step-by-step. Sign-in will not work with the placeholder value.
 * ---------------------------------------------------------------
 */

import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./app.jsx";
import "./theme.css";

const GOOGLE_CLIENT_ID = "814801522934-8dvck6vll18lghp0oaii6ah32buqtepv.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={814801522934-8dvck6vll18lghp0oaii6ah32buqtepv.apps.googleusercontent.com}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
