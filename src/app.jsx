/**
 * app.jsx
 * ---------------------------------------------------------------
 * Top-level component. Holds the signed-in user (or null) and
 * renders either the Google sign-in screen or the editor + header.
 * ---------------------------------------------------------------
 */

import { useState } from "react";
import { googleLogout } from "@react-oauth/google";
import { Analytics } from "@vercel/analytics/react";
import AppLogo from "./applogo.jsx";
import AppName from "./appname.jsx";
import GoogleLoginScreen from "./googlelogin.jsx";
import PhotoEditor from "./photoeditor.jsx";

export default function App() {
  const [user, setUser] = useState(null);

  function handleLogout() {
    googleLogout();
    setUser(null);
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div className="grain-overlay" />
      <Analytics />

      {!user ? (
        <GoogleLoginScreen onSuccess={setUser} />
      ) : (
        <>
          <header
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 24px",
              borderBottom: "1px solid var(--border)",
              background: "var(--bg-panel)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <AppLogo size={32} />
              <AppName size="sm" />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {user.picture && (
                  <img
                    src={user.picture}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      border: "1px solid var(--border-strong)",
                    }}
                  />
                )}
                <span style={{ fontSize: "0.82rem", color: "var(--ink-dim)" }}>{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                style={{
                  padding: "7px 14px",
                  fontSize: "0.78rem",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border)",
                  background: "transparent",
                  color: "var(--ink-dim)",
                  cursor: "pointer",
                }}
              >
                Sign out
              </button>
            </div>
          </header>

          <PhotoEditor />
        </>
      )}
    </div>
  );
}
