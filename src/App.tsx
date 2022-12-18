import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import ScanQrCode from "./pages/scanQrCode/ScanQrCode";
import "./App.css";
import Login from "./pages/login/Login";
function App() {
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/scan_qrcode" element={<ScanQrCode />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
