import { Html5Qrcode, Html5QrcodeScanner } from "html5-qrcode";
import { Html5QrcodeScanType } from "html5-qrcode/esm/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { checkinUser } from "../../api/user";
import useLocalStorage from "../../hook/useLocalStorage";
import useModal from "../../hook/useModal";
import ScanQrCodeResult from "../scanQrCodeResult/ScanQrCodeResult";

const idScanContainer = "reader";
// const width = window.innerWidth;
// const height = window.innerHeight;
// const aspectRatio = width / height;
// const reverseAspectRatio = height / width;

// const mobileAspectRatio =
//   reverseAspectRatio > 1.5
//     ? reverseAspectRatio + (reverseAspectRatio * 12) / 100
//     : reverseAspectRatio;

export type TResult = {
  data: any;
  error: any;
};
export default function ScanQrCode() {
  const navigate = useNavigate();
  const [result, setResult] = React.useState<TResult>({
    data: undefined,
    error: undefined,
  });
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
    if (isShowing || !Html5QrcodeScanner) return;

    let html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 20,
        qrbox: { width: 250, height: 250 },
        supportedScanTypes: [
          Html5QrcodeScanType.SCAN_TYPE_CAMERA,
          Html5QrcodeScanType.SCAN_TYPE_FILE,
        ],
        videoConstraints: {
          facingMode: "environment",
        },
        // aspectRatio: width < 600 ? mobileAspectRatio : aspectRatio,
      },
      false
    );
    html5QrcodeScanner.render(
      (_data: any) => {
        console.log("success ->", _data);
        html5QrcodeScanner.clear();
        checkinUser(_data)
          .then((_result: any) => {
            setResult({
              error: undefined,
              data: _result?.data,
            });
          })
          .catch((err) => {
            console.log({ err });
            setResult({
              error: err,
              data: undefined,
            });
          });
      },
      (err: any) => console.log("err ->", err)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Html5Qrcode, isShowing]);

  React.useEffect(() => {
    if (isShowing) return;
    setResult({
      error: undefined,
      data: undefined,
    });
  }, [isShowing]);

  React.useEffect(() => {
    if (!result.data && !result.error) return;
    toggle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);
  return (
    <div className="w-[18rem] h-[38rem] flex flex-col items-center">
      <img
        src="/iconic-black2.png"
        alt=""
        className="w-[12rem] h-[12rem] object-cover"
      />
      <div id={idScanContainer} className="w-[18rem] h-[18rem]"></div>
      <ScanQrCodeResult isShowing={isShowing} toggle={toggle} result={result} />
    </div>
  );
}
