import React from "react";
import {
  useHtml5QrCodeScanner,
  useAvailableDevices,
} from "react-html5-qrcode-reader";

const idScanContainer = "reader";
const config = { fps: 10, qrbox: { width: 250, height: 250 } };

const html5QrCodeScannerFile = "https://unpkg.com/html5-qrcode";

export default function ScanQrCode() {
  const { Html5QrcodeScanner } = useHtml5QrCodeScanner(html5QrCodeScannerFile);
  const { devices, error } = useAvailableDevices(html5QrCodeScannerFile);
  console.log({ devices, error });
  //useEffect

  //function

  //useEffect
  React.useEffect(() => {
    if (Html5QrcodeScanner) {
      let html5QrcodeScanner = new Html5QrcodeScanner("reader", config, false);
      html5QrcodeScanner.render(
        (data: any) => console.log("success ->", data),
        (err: any) => console.log("err ->", err)
      );
    }
  }, [Html5QrcodeScanner]);

  return (
    <div className="w-[400px] h-[700px] shadow-lg shadow-gray-400">
      <div id={idScanContainer} className="w-full h-full"></div>
    </div>
  );
}
