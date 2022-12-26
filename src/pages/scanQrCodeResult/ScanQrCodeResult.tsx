import React from "react";
import ReactDOM from "react-dom";
import { TResult } from "../scanQrCode/ScanQrCode";
interface IPropsResultScanQrCode {
  isShowing: boolean;
  toggle: () => void;
  result: TResult;
}
const ScanQrCodeResult = ({
  isShowing,
  toggle,
  result,
}: IPropsResultScanQrCode) => {
  const renderMessageError = React.useMemo(() => {
    if (result.error) {
      if (result.error.response.status === 400) {
        return result.error?.response?.data;
      }
      return result.error?.response?.statusText;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="w-[100%] h-[100%] bg-gray-500 fixed top-0 flex items-center justify-center bg-opacity-50">
            <div
              className="fixed top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] w-[60%] max-w-[40rem] h-[15rem] p-4 shadow-lg shadow-gray-400 
            bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 opacity-100 rounded-[10px]"
            >
              <div className="w-full flex justify-end">
                <i
                  className="fa-solid fa-xmark cursor-pointer text-gray-400 p-1 hover:to-pink-300 hover:text-gray-600"
                  onClick={toggle}
                ></i>
              </div>
              {renderMessageError && <p>{renderMessageError}</p>}
              {result.data && (
                <div>
                  <p className="text-red-500 text-[20px]">
                    {result.data?.name} was checkin!
                  </p>
                  <p className="text-gray-800 font-semibold">Info user :</p>
                  <p className="text-gray-500">Name: {result.data?.name}</p>
                  <p className="text-gray-500">Email: {result.data?.email}</p>
                  <p className="text-gray-500">
                    Company id: {result.data?.company_id}
                  </p>
                  <p className="text-gray-500">
                    Last check in: {result.data?.last_check_in}
                  </p>
                </div>
              )}
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
};

export default ScanQrCodeResult;
