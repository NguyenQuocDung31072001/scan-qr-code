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
          <div className="w-[100%] h-[100%] bg-gray-500 fixed top-0 flex items-center justify-center bg-opacity-50">
            <div
              className="fixed top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] w-[80%] min-w-[37rem] sm:w-[50%] sm:min-w-[30rem] lg:w-[40%] h-[15rem] p-4 shadow-lg shadow-gray-400 
            bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 opacity-100 rounded-[10px]"
            >
              <div className="w-full flex justify-end">
                <i
                  className="fa-solid fa-xmark cursor-pointer text-gray-400 p-1 hover:to-pink-300 hover:text-gray-600"
                  onClick={toggle}
                ></i>
              </div>
              <p className="text-red-500 text-[20px]">
                {data?.name} was checkin!
              </p>
              <p className="text-gray-800 font-semibold">Info user :</p>
              <p className="text-gray-500">Name: {data?.name}</p>
              <p className="text-gray-500">Email: {data?.email}</p>
              <p className="text-gray-500">Company id: {data?.company_id}</p>
              <p className="text-gray-500">
                Last check in: {data?.last_check_in}
              </p>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
};

export default ScanQrCodeResult;
