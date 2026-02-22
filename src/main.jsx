import React from "react";
import { createRoot } from "react-dom/client";
import StudyPlanner from "./StudyPlanner";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StudyPlanner />
  </React.StrictMode>
);
