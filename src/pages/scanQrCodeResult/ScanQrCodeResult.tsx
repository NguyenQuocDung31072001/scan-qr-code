import React from "react";

interface IPropsResultScanQrCode {
  data: any;
  open: boolean;
  setOpen: any;
}
export default function ScanQrCodeResult({
  data,
  open,
  setOpen,
}: IPropsResultScanQrCode) {
  return (
    <>
      {open && (
        <div
          className="w-full h-full bg-red-100 flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-[300px] max-w-[300px] h-[350px] md:w-[400px] md:max-w-[400px] md:h-[550px] flex items-center relative"
            onClick={() => {}}
          >
            <div className="w-full h-full p-4 shadow-lg shadow-gray-400">
              <span>{data}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
