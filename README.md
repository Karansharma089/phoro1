# Phoro

A black & electric-cyan themed photo editor with Google sign-in, built with
React + Vite. Sign in, drop in a photo, adjust it with sliders and presets,
rotate/flip it, and export the result as a PNG.

## File guide

Each file is named for the job it does:

| File | What it does |
|---|---|
| `src/applogo.jsx` | The Phoro logo mark (aperture-blade icon) |
| `src/appname.jsx` | The "Phoro" wordmark/name, with optional tagline |
| `src/googlelogin.jsx` | The Google sign-in screen |
| `src/photoeditor.jsx` | Canvas rendering + all editing state/logic |
| `src/toolbar.jsx` | The sliders, presets, and transform buttons UI |
| `src/app.jsx` | Top-level app: header, sign-out, routes to login or editor |
| `src/main.jsx` | React entry point; sets up Google OAuth provider |
| `src/theme.css` | Black & cyan color/typography theme tokens |

## Running it locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (typically `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Setting up real Google sign-in

The app ships with a placeholder Client ID, so the Google button will
render but sign-in will fail until you connect your own Google Cloud
project. This takes about five minutes:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/) and
   create a project (or pick an existing one).
2. Open **APIs & Services → OAuth consent screen** and configure it
   (External is fine for testing; add your own email as a test user).
3. Open **APIs & Services → Credentials → Create Credentials → OAuth
   client ID**.
4. Choose **Web application**.
5. Under **Authorized JavaScript origins**, add the URL you'll run the app
   from, e.g. `http://localhost:5173` for local dev, and your real domain
   once you deploy (e.g. `https://yourapp.com`).
6. Copy the generated **Client ID** (it ends in
   `.apps.googleusercontent.com`).
7. Open `src/main.jsx` and replace:
   ```js
   const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";
   ```
   with your real Client ID.
8. Restart the dev server.

No backend or client secret is needed for this flow — it uses Google
Identity Services' one-tap/button sign-in, which verifies the user
entirely client-side via a signed JWT.

## Editing features

- **Presets** — Original, Noir, Vintage, Cool, Vivid
- **Adjustments** — brightness, contrast, saturation, grayscale, sepia, blur
- **Transform** — rotate 90° left/right, flip horizontal/vertical
- **Export** — downloads the edited image as `phoro-edit.png`

## Theme

Black/near-void background (`#05080a`) with an electric cyan accent
(`#2ee6f0`), Space Grotesk for display type, Inter for body text, and
JetBrains Mono for numeric readouts. Viewfinder-style corner brackets
(the `.viewfinder` class in `theme.css`) frame the login card and the
image canvas as the app's signature visual motif.
