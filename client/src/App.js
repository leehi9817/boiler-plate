import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Auth from "./hoc/Auth";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path="/" element={<Navigate to="/welcome" replace />} />
          <Route exact path="/welcome" element={Auth(Landing, true)} />
          <Route exact path="/login" element={Auth(Login, false)} />
          <Route exact path="/register" element={Auth(Register, false)} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
