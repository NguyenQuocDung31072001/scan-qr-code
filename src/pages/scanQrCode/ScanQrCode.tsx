import { Html5Qrcode, Html5QrcodeScanner } from "html5-qrcode";
import {
  Html5QrcodeScanType,
  Html5QrcodeSupportedFormats,
} from "html5-qrcode/esm/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { checkinUser } from "../../api/user";
import useLocalStorage from "../../hook/useLocalStorage";
import useModal from "../../hook/useModal";
import ScanQrCodeResult from "../scanQrCodeResult/ScanQrCodeResult";

const idScanContainer = "reader";
// const formatsToSupport = [Html5QrcodeSupportedFormats.QR_CODE];

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
    if (Html5QrcodeScanner) {
      let html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        {
          fps: 10,
          qrbox: 250,
          supportedScanTypes: [
            Html5QrcodeScanType.SCAN_TYPE_CAMERA,
            Html5QrcodeScanType.SCAN_TYPE_FILE,
          ],
          // formatsToSupport: :exchange_scannerFormats,
          videoConstraints: {
            facingMode: "environment",
            aspectRatio: 1,
          },
          // focusMode: "continuous",
        },
        false
      );
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
  }, [Html5Qrcode, isShowing]);

  React.useEffect(() => {
    if (isShowing) return;
    setData(null);
  }, [isShowing]);

  React.useEffect(() => {
    if (!data) return;
    toggle();
    checkinUser(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return (
    <div className="w-[20rem] h-[20rem]">
      <div id={idScanContainer} className="w-[20rem] h-[20rem]"></div>
      <ScanQrCodeResult isShowing={isShowing} toggle={toggle} data={data} />
    </div>
  );
}
