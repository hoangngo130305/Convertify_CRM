    import { GoogleOAuthProvider } from "@react-oauth/google"; // <--- Import này
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";

const GOOGLE_CLIENT_ID =
  "211407744910-lm001icjepjuf7g2m1eisijq9t7an60j.apps.googleusercontent.com";

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <App />
  </GoogleOAuthProvider>
);
