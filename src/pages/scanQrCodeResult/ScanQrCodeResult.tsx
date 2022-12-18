import React from "react";
import ReactDOM from "react-dom";
interface IPropsResultScanQrCode {
  isShowing: boolean;
  toggle: () => void;
  data: any;
}
const ScanQrCodeResult = ({
  isShowing,
  toggle,
  data,
}: IPropsResultScanQrCode) => {
  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="w-[100vw] h-[100vh] bg-gray-500 fixed top-0 flex items-center justify-center bg-opacity-50">
            <div className="fixed top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]  w-[300px] h-[300px] p-4 shadow-lg shadow-gray-400 bg-white opacity-100 ">
              <div className="w-full flex justify-end">
                <i
                  className="fa-solid fa-xmark cursor-pointer text-gray-400 p-1 hover:bg-gray-200 hover:text-gray-600"
                  onClick={toggle}
                ></i>
              </div>
              <span>{data}</span>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
};

export default ScanQrCodeResult;
