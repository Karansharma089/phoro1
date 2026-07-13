/**
 * appname.jsx
 * ---------------------------------------------------------------
 * The Phoro wordmark. Kept as its own component (rather than
 * inline text) so the name's typography and tagline stay
 * consistent anywhere it's used — header, login screen, footer.
 * ---------------------------------------------------------------
 */

export default function AppName({ withTagline = false, size = "md" }) {
  const sizes = {
    sm: { name: "1.1rem", tagline: "0.7rem" },
    md: { name: "1.5rem", tagline: "0.78rem" },
    lg: { name: "2.4rem", tagline: "0.95rem" },
  };
  const s = sizes[size] || sizes.md;

  return (
    <div style={{ lineHeight: 1.1 }}>
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: s.name,
          letterSpacing: "0.01em",
          color: "var(--ink)",
        }}
      >
        Phor
        <span style={{ color: "var(--cyan)" }}>o</span>
      </span>
      {withTagline && (
        <div
          className="mono"
          style={{
            fontSize: s.tagline,
            color: "var(--ink-dim)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginTop: 4,
          }}
        >
          Focus. Edit. Export.
        </div>
      )}
    </div>
  );
}
