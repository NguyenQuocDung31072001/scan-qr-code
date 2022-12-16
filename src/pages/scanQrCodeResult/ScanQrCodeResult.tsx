import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ScanQrCodeResult() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="w-[300px] max-w-[300px] h-[350px] md:w-[400px] md:max-w-[400px] md:h-[550px] flex items-center relative">
      <div className="w-full h-full p-4 shadow-lg shadow-gray-400 flex items-center justify-center">
        {location?.state?.data}
      </div>
      <div className="absolute bottom-0 w-full flex justify-center">
        <div
          onClick={() => navigate("/scan_qrcode")}
          className="rounded-[100%] cursor-pointer w-[48px] h-[48px] shadow shadow-gray-700 flex items-center justify-center"
        >
          <img src="/scanner_icon_32px.png" alt="" className="text-[12px] " />
        </div>
      </div>
    </div>
  );
}
