import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate("/scan_qrcode");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>NotFound</div>;
}
