import { Html5Qrcode, Html5QrcodeScanner } from "html5-qrcode";
import { Html5QrcodeScanType } from "html5-qrcode/esm/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { checkinUser } from "../../api/user";
import useLocalStorage from "../../hook/useLocalStorage";
import useModal from "../../hook/useModal";
import ScanQrCodeResult from "../scanQrCodeResult/ScanQrCodeResult";

const idScanContainer = "reader";
const width = window.innerWidth;
const height = window.innerHeight;
const aspectRatio = width / height;
const reverseAspectRatio = height / width;

const mobileAspectRatio =
  reverseAspectRatio > 1.5
    ? reverseAspectRatio + (reverseAspectRatio * 12) / 100
    : reverseAspectRatio;

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
          fps: 20,
          qrbox: { width: 250, height: 250 },
          supportedScanTypes: [
            Html5QrcodeScanType.SCAN_TYPE_CAMERA,
            Html5QrcodeScanType.SCAN_TYPE_FILE,
          ],
          videoConstraints: {
            facingMode: "environment",
            aspectRatio: width < 600 ? mobileAspectRatio : aspectRatio,
          },
        },
        false
      );
      html5QrcodeScanner.render(
        (_data: any) => {
          console.log("success ->", data);
          html5QrcodeScanner.clear();
          checkinUser(_data).then((result) => {
            setData(result?.data);
          });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return (
    <div className="w-[20rem] h-[20rem]">
      <div id={idScanContainer} className="w-[20rem] h-[20rem]"></div>
      <ScanQrCodeResult isShowing={isShowing} toggle={toggle} data={data} />
    </div>
  );
}
