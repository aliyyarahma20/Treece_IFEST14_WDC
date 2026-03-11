import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="1076788678293-1ut73v00o6tnj47eho5qad4i93mcqgr8.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);