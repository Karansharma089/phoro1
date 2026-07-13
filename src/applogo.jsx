/**
 * applogo.jsx
 * ---------------------------------------------------------------
 * The Phoro mark: a camera-aperture iris built from overlapping
 * blades. Rendered as inline SVG so it stays crisp at any size and
 * can pick up the cyan glow used across the rest of the app.
 * ---------------------------------------------------------------
 */

export default function AppLogo({ size = 40, spinning = false }) {
  const blades = 6;
  const bladeElements = Array.from({ length: blades }).map((_, i) => {
    const rotation = (360 / blades) * i;
    return (
      <path
        key={i}
        d="M20 20 L36 14 A18 18 0 0 1 33.5 33.5 Z"
        fill="url(#bladeGradient)"
        opacity="0.85"
        transform={`rotate(${rotation} 20 20)`}
      />
    );
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Phoro logo"
      style={{
        filter: "drop-shadow(0 0 6px rgba(46, 230, 240, 0.55))",
        animation: spinning ? "phoro-spin 12s linear infinite" : "none",
      }}
    >
      <defs>
        <radialGradient id="bladeGradient" cx="30%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#7ff3fa" />
          <stop offset="100%" stopColor="#0e8b95" />
        </radialGradient>
      </defs>
      <circle cx="20" cy="20" r="19" stroke="#2ee6f0" strokeOpacity="0.35" strokeWidth="1" />
      <g>{bladeElements}</g>
      <circle cx="20" cy="20" r="6" fill="#05080a" stroke="#2ee6f0" strokeWidth="1.2" />
      <style>{`
        @keyframes phoro-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </svg>
  );
}
