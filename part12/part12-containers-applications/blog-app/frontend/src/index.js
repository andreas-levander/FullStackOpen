import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

export const backend = process.env.BACKEND_URL;

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
