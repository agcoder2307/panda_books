import { useEffect } from "react";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import LogoImage from "../assets/svg/panda_books.svg";
import { colors } from "../constants/colors";
const PageLoader = () => {
  useEffect(() => {
    nprogress.start();
    return () => {
      nprogress.done();
    };
  }, []);
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-3xl text-4xl"
      style={{ background: colors.primary }}
    >
      <img
        src={LogoImage}
        alt="logo"
        width={300}
        height={300}
        className="animate-fade"
      />
    </div>
  );
};

export default PageLoader;
