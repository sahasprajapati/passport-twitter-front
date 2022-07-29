import { FC, ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Splash } from "../Splash/Splash";
import { Footer } from "../Footer/Footer";
import { CustomNavbar } from "../Navbar/Navbar";
import { Col, Container, Row } from "react-bootstrap";
import "./layout.css";
import { getToken } from "../../utils/log.util";
interface ILayout {
  children: ReactNode;
}

export const Layout: FC<ILayout> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = getToken();

    if (
      !token &&
      location.pathname !== "/login" &&
      location.pathname !== "/sign-up"
    ) {
      navigate("/login");
    }
  }, []);

  return loading ? (
    <Splash />
  ) : (
    <>
      <CustomNavbar />

      <Container className="layout">{children}</Container>
    </>
  );
};
