import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MobileRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    if (isMobile) {
      //   history.push("/404"); // Redirecionar para a página 404
      navigate("/404");
    }
  }, [navigate]);

  return null;
};

export default MobileRedirect;
