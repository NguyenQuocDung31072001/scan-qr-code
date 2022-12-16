import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import ScanQrCode from "./pages/scanQrCode/ScanQrCode";
import ScanQrCodeResult from "./pages/scanQrCodeResult/ScanQrCodeResult";

function App() {
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <BrowserRouter>
        <Routes>
          <Route path="/scan_qrcode" element={<ScanQrCode />} />
          <Route path="/scan_qrcode_result" element={<ScanQrCodeResult />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
