import { Html5QrcodeScanner } from "html5-qrcode";
import {
  Html5QrcodeScanType,
  Html5QrcodeSupportedFormats,
} from "html5-qrcode/esm/core";
import React from "react";
import { useNavigate } from "react-router-dom";

const idScanContainer = "reader";
const formatsToSupport = [
  Html5QrcodeSupportedFormats.QR_CODE,
  Html5QrcodeSupportedFormats.UPC_A,
  Html5QrcodeSupportedFormats.UPC_E,
  Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION,
];
const config = {
  fps: 10,
  qrbox: { width: 250, height: 250 },
  supportedScanTypes: [
    Html5QrcodeScanType.SCAN_TYPE_CAMERA,
    Html5QrcodeScanType.SCAN_TYPE_FILE,
  ],
  rememberLastUsedCamera: true,
  showTorchButtonIfSupported: true,
  formatsToSupport: formatsToSupport,
};
export default function ScanQrCode() {
  const navigate = useNavigate();
  //useEffect
  React.useEffect(() => {
    if (Html5QrcodeScanner) {
      let html5QrcodeScanner = new Html5QrcodeScanner("reader", config, false);
      html5QrcodeScanner.render(
        (data: any) => {
          console.log("success ->", data);
          navigate("/scan_qrcode_result", {
            state: {
              data: data,
            },
          });
          html5QrcodeScanner.clear();
        },
        (err: any) => console.log("err ->", err)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Html5QrcodeScanner]);

  return (
    <div className="w-[300px] h-[350px] md:w-[400px] md:h-[550px] sm:w-[300px] sm:h-[350px] flex items-center">
      <div
        id={idScanContainer}
        className="w-[400px] h-[400px] m-auto shadow-lg shadow-gray-400"
      ></div>
    </div>
  );
}
