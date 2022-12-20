import { Html5Qrcode } from "html5-qrcode";
import {
  Html5QrcodeScanType,
  // Html5QrcodeSupportedFormats,
} from "html5-qrcode/esm/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hook/useLocalStorage";
import useModal from "../../hook/useModal";
import ScanQrCodeResult from "../scanQrCodeResult/ScanQrCodeResult";

const idScanContainer = "reader";
// const formatsToSupport = [Html5QrcodeSupportedFormats.QR_CODE];
const config = {
  fps: 10,
  qrbox: { width: 180, height: 120 },
  // supportedScanTypes: [
  //   Html5QrcodeScanType.SCAN_TYPE_CAMERA,
  //   Html5QrcodeScanType.SCAN_TYPE_FILE,
  // ],
  // formatsToSupport: formatsToSupport,
};

export default function ScanQrCode() {
  const navigate = useNavigate();
  const [data, setData] = React.useState<any>();
  const [email, setEmail] = useLocalStorage("email", "");
  const [password, setPassword] = useLocalStorage("password", "");
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
    if (Html5Qrcode) {
      const html5QrCode = new Html5Qrcode("reader");
      html5QrCode.start(
        { facingMode: "environment" },
        config,
        (success) => {
          console.log({ success });
          setData(success);
          html5QrCode.stop();
        },
        (error) => {
          console.log({ error });
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Html5Qrcode, isShowing]);

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
    <div className="w-[20rem] h-[15rem]">
      <div id={idScanContainer} className="w-[20rem] h-[15rem]"></div>
      <ScanQrCodeResult isShowing={isShowing} toggle={toggle} data={data} />
    </div>
  );
}
