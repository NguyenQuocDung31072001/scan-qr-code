import { Html5QrcodeScanner } from "html5-qrcode";
import {
  Html5QrcodeScanType,
  Html5QrcodeSupportedFormats,
} from "html5-qrcode/esm/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hook/useLocalStorage";
import useModal from "../../hook/useModal";
import ScanQrCodeResult from "../scanQrCodeResult/ScanQrCodeResult";

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
  showZoomSliderIfSupported: true,
  formatsToSupport: formatsToSupport,
};

export default function ScanQrCode() {
  const navigate = useNavigate();
  console.log("render");
  const [data, setData] = React.useState<any>();
  const [email, setEmail] = useLocalStorage("email", "");
  const [password, setPassword] = useLocalStorage("password", "");
  console.log({ email });
  React.useEffect(() => {
    if (!email || !password) {
      setEmail("");
      setPassword("");
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //hook
  const { isShowing, toggle } = useModal();
  //useEffect
  React.useEffect(() => {
    if (isShowing) return;
    if (Html5QrcodeScanner) {
      let html5QrcodeScanner = new Html5QrcodeScanner("reader", config, false);
      html5QrcodeScanner.render(
        (data: any) => {
          console.log("success ->", data);
          setData(data);
          html5QrcodeScanner.clear();
        },
        (err: any) => console.log("err ->", err)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Html5QrcodeScanner, isShowing]);

  React.useEffect(() => {
    if (isShowing) return;
    setData(null);
  }, [isShowing]);

  React.useEffect(() => {
    if (!data) return;
    toggle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="max-w-[600px] min-w-[300px] h-[350px] flex items-center">
      <div
        id={idScanContainer}
        className=" max-w-[400px] min-w-[300px] h-[400px] m-auto shadow-lg shadow-gray-400"
      ></div>
      <ScanQrCodeResult isShowing={isShowing} toggle={toggle} data={data} />
    </div>
  );
}
