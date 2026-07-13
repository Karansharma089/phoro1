/**
 * photoeditor.jsx
 * ---------------------------------------------------------------
 * Owns all image-editing state (filters, rotation, flip) and does
 * the actual canvas drawing. Renders the canvas plus <Toolbar>,
 * which is a "dumb" controls component fed by this one.
 * ---------------------------------------------------------------
 */

import { useEffect, useRef, useState, useCallback } from "react";
import Toolbar from "./toolbar.jsx";

const DEFAULT_FILTERS = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  grayscale: 0,
  sepia: 0,
  blur: 0,
};

const PRESET_VALUES = {
  original: DEFAULT_FILTERS,
  noir: { brightness: 100, contrast: 125, saturation: 100, grayscale: 100, sepia: 0, blur: 0 },
  vintage: { brightness: 108, contrast: 92, saturation: 85, grayscale: 0, sepia: 55, blur: 0 },
  cool: { brightness: 104, contrast: 105, saturation: 80, grayscale: 0, sepia: 0, blur: 0 },
  vivid: { brightness: 106, contrast: 114, saturation: 155, grayscale: 0, sepia: 0, blur: 0 },
};

function buildFilterString(f) {
  return `brightness(${f.brightness}%) contrast(${f.contrast}%) saturate(${f.saturation}%) grayscale(${f.grayscale}%) sepia(${f.sepia}%) blur(${f.blur}px)`;
}

export default function PhotoEditor() {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [activePreset, setActivePreset] = useState("original");
  const [rotation, setRotation] = useState(0); // 0, 90, 180, 270
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;
    const ctx = canvas.getContext("2d");

    const swap = rotation % 180 !== 0;
    const w = image.naturalWidth;
    const h = image.naturalHeight;
    canvas.width = swap ? h : w;
    canvas.height = swap ? w : h;

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
    ctx.filter = buildFilterString(filters);
    ctx.drawImage(image, -w / 2, -h / 2, w, h);
    ctx.restore();
  }, [image, filters, rotation, flipH, flipV]);

  useEffect(() => {
    draw();
  }, [draw]);

  function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        setImage(img);
        setFilters(DEFAULT_FILTERS);
        setActivePreset("original");
        setRotation(0);
        setFlipH(false);
        setFlipV(false);
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  function handleDownload() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "phoro-edit.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  function handleSliderChange(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setActivePreset(null);
  }

  function handlePreset(key) {
    setFilters(PRESET_VALUES[key]);
    setActivePreset(key);
  }

  function handleRotate(delta) {
    setRotation((prev) => (((prev + delta) % 360) + 360) % 360);
  }

  function handleFlip(axis) {
    if (axis === "h") setFlipH((v) => !v);
    else setFlipV((v) => !v);
  }

  function handleReset() {
    setFilters(DEFAULT_FILTERS);
    setActivePreset("original");
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
  }

  return (
    <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 32,
          overflow: "auto",
        }}
      >
        {image ? (
          <div
            className="viewfinder"
            style={{ padding: 20, borderRadius: "var(--radius-md)" }}
          >
            <canvas
              ref={canvasRef}
              style={{
                maxWidth: "100%",
                maxHeight: "62vh",
                borderRadius: "var(--radius-sm)",
                boxShadow: "0 0 40px rgba(46, 230, 240, 0.08)",
              }}
            />
          </div>
        ) : (
          <label
            className="viewfinder"
            style={{
              width: "100%",
              maxWidth: 480,
              padding: "64px 32px",
              textAlign: "center",
              border: "1px dashed var(--border-strong)",
              borderRadius: "var(--radius-lg)",
              cursor: "pointer",
              color: "var(--ink-dim)",
            }}
          >
            <div style={{ fontSize: "0.95rem", color: "var(--ink)", marginBottom: 8 }}>
              No image loaded
            </div>
            <div style={{ fontSize: "0.8rem" }}>Click to upload a photo and start editing</div>
            <input type="file" accept="image/*" onChange={handleUpload} style={{ display: "none" }} />
          </label>
        )}
      </div>

      <Toolbar
        values={filters}
        onSliderChange={handleSliderChange}
        onPreset={handlePreset}
        activePreset={activePreset}
        onRotate={handleRotate}
        onFlip={handleFlip}
        onUpload={handleUpload}
        onDownload={handleDownload}
        onReset={handleReset}
        hasImage={!!image}
      />
    </div>
  );
}
