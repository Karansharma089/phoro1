/**
 * toolbar.jsx
 * ---------------------------------------------------------------
 * Pure presentation + input component. Renders every control for
 * the editor (filter sliders, presets, transform buttons, file
 * actions) and reports changes upward through the callbacks it's
 * given. All actual pixel/canvas work happens in photoeditor.jsx.
 * ---------------------------------------------------------------
 */

const PRESETS = [
  { key: "original", label: "Original" },
  { key: "noir", label: "Noir" },
  { key: "vintage", label: "Vintage" },
  { key: "cool", label: "Cool" },
  { key: "vivid", label: "Vivid" },
];

const SLIDERS = [
  { key: "brightness", label: "Brightness", min: 0, max: 200, unit: "%" },
  { key: "contrast", label: "Contrast", min: 0, max: 200, unit: "%" },
  { key: "saturation", label: "Saturation", min: 0, max: 200, unit: "%" },
  { key: "grayscale", label: "Grayscale", min: 0, max: 100, unit: "%" },
  { key: "sepia", label: "Sepia", min: 0, max: 100, unit: "%" },
  { key: "blur", label: "Blur", min: 0, max: 10, unit: "px" },
];

function SectionLabel({ children }) {
  return (
    <div
      className="mono"
      style={{
        fontSize: "0.68rem",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--ink-dim)",
        marginBottom: 12,
      }}
    >
      {children}
    </div>
  );
}

function IconButton({ onClick, title, children, disabled }) {
  return (
    <button
      onClick={onClick}
      title={title}
      disabled={disabled}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        borderRadius: "var(--radius-sm)",
        border: "1px solid var(--border)",
        background: "var(--bg-panel-raised)",
        color: disabled ? "var(--ink-faint)" : "var(--ink)",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "border-color 120ms ease, color 120ms ease",
      }}
      onMouseEnter={(e) => !disabled && (e.currentTarget.style.borderColor = "var(--cyan)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
    >
      {children}
    </button>
  );
}

export default function Toolbar({
  values,
  onSliderChange,
  onPreset,
  activePreset,
  onRotate,
  onFlip,
  onUpload,
  onDownload,
  onReset,
  hasImage,
}) {
  return (
    <aside
      style={{
        width: 300,
        flexShrink: 0,
        background: "var(--bg-panel)",
        borderLeft: "1px solid var(--border)",
        padding: "24px 20px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 28,
      }}
    >
      {/* File actions */}
      <div>
        <SectionLabel>Image</SectionLabel>
        <div style={{ display: "flex", gap: 10 }}>
          <label
            style={{
              flex: 1,
              textAlign: "center",
              padding: "10px 0",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border-strong)",
              background: "var(--bg-panel-raised)",
              color: "var(--cyan)",
              fontSize: "0.85rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Upload
            <input
              type="file"
              accept="image/*"
              onChange={onUpload}
              style={{ display: "none" }}
            />
          </label>
          <button
            onClick={onDownload}
            disabled={!hasImage}
            style={{
              flex: 1,
              padding: "10px 0",
              borderRadius: "var(--radius-sm)",
              border: "none",
              background: hasImage ? "var(--cyan)" : "var(--bg-panel-raised)",
              color: hasImage ? "#04181a" : "var(--ink-faint)",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: hasImage ? "pointer" : "not-allowed",
            }}
          >
            Download
          </button>
        </div>
      </div>

      {/* Presets */}
      <div>
        <SectionLabel>Presets</SectionLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {PRESETS.map((p) => (
            <button
              key={p.key}
              onClick={() => onPreset(p.key)}
              style={{
                padding: "7px 14px",
                borderRadius: 999,
                fontSize: "0.78rem",
                border:
                  activePreset === p.key
                    ? "1px solid var(--cyan)"
                    : "1px solid var(--border)",
                background:
                  activePreset === p.key ? "var(--cyan-glow-soft)" : "transparent",
                color: activePreset === p.key ? "var(--cyan-strong)" : "var(--ink-dim)",
                cursor: "pointer",
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sliders */}
      <div>
        <SectionLabel>Adjust</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {SLIDERS.map((s) => (
            <div key={s.key}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 6,
                  fontSize: "0.78rem",
                }}
              >
                <span style={{ color: "var(--ink)" }}>{s.label}</span>
                <span className="mono" style={{ color: "var(--cyan-strong)" }}>
                  {values[s.key]}
                  {s.unit}
                </span>
              </div>
              <input
                type="range"
                min={s.min}
                max={s.max}
                value={values[s.key]}
                onChange={(e) => onSliderChange(s.key, Number(e.target.value))}
                style={{ width: "100%", accentColor: "#2ee6f0" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Transform */}
      <div>
        <SectionLabel>Transform</SectionLabel>
        <div style={{ display: "flex", gap: 10 }}>
          <IconButton title="Rotate left" onClick={() => onRotate(-90)}>⟲</IconButton>
          <IconButton title="Rotate right" onClick={() => onRotate(90)}>⟳</IconButton>
          <IconButton title="Flip horizontal" onClick={() => onFlip("h")}>⇋</IconButton>
          <IconButton title="Flip vertical" onClick={() => onFlip("v")}>⇵</IconButton>
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={onReset}
        style={{
          marginTop: "auto",
          padding: "10px 0",
          borderRadius: "var(--radius-sm)",
          border: "1px solid var(--danger-glow)",
          background: "transparent",
          color: "var(--danger)",
          fontSize: "0.82rem",
          cursor: "pointer",
        }}
      >
        Reset all edits
      </button>
    </aside>
  );
}
