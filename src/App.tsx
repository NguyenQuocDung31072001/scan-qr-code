import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import NotFound from "./pages/NotFound";
import ScanQrCode from "./pages/scanQrCode/ScanQrCode";

function App() {
  return (
    <div className="flex items-center justify-center h-[100vh] bg-gray-200">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route path="/scan_qrcode" element={<ScanQrCode />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
