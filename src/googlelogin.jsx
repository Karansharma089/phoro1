/**
 * googlelogin.jsx
 * ---------------------------------------------------------------
 * Wraps @react-oauth/google's <GoogleLogin> button. On success it
 * decodes the returned credential (a JWT) to pull the user's name,
 * email and avatar, then hands a simple user object up to the
 * parent via onSuccess.
 *
 * NOTE: this requires a real Google OAuth Client ID configured in
 * src/main.jsx (see README.md) — without one, Google will reject
 * the sign-in request.
 * ---------------------------------------------------------------
 */

import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import AppLogo from "./applogo.jsx";
import AppName from "./appname.jsx";

export default function GoogleLoginScreen({ onSuccess }) {
  const [error, setError] = useState("");

  function handleSuccess(credentialResponse) {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      onSuccess({
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
      });
    } catch (err) {
      setError("Couldn't read your Google profile. Please try again.");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        className="viewfinder"
        style={{
          background: "var(--bg-panel)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          padding: "48px 40px",
          width: "100%",
          maxWidth: 380,
          textAlign: "center",
          boxShadow: "0 0 60px rgba(46, 230, 240, 0.06)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <AppLogo size={56} />
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
          <AppName size="lg" />
        </div>
        <p
          className="mono"
          style={{
            color: "var(--ink-dim)",
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginTop: 4,
            marginBottom: 32,
          }}
        >
          Sign in to start editing
        </p>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <GoogleLogin
            theme="filled_black"
            shape="pill"
            size="large"
            text="signin_with"
            onSuccess={handleSuccess}
            onError={() => setError("Sign-in failed. Please try again.")}
          />
        </div>

        {error && (
          <p style={{ color: "var(--danger)", fontSize: "0.8rem", marginTop: 16 }}>{error}</p>
        )}

        <p
          style={{
            color: "var(--ink-faint)",
            fontSize: "0.72rem",
            marginTop: 32,
            lineHeight: 1.5,
          }}
        >
          By continuing you agree to let Phoro read your name, email and
          profile photo from Google.
        </p>
      </div>
    </div>
  );
}
