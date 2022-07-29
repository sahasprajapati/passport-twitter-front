import { Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { logoutService } from "../../service/auth.service";
import { isLoggedIn, logOut } from "../../utils/log.util";

export const CustomNavbar = () => {
  const navigate = useNavigate();
  return (
    <Navbar className="ml-auto" bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/">TwittAuth</Link>
        </Navbar.Brand>

        <>
          {isLoggedIn() ? (
            <Nav.Item
              onClick={async () => {
                const { success } = await logoutService();
                if (success) navigate("/login");
              }}
            >
              <Link to="/login">Log Out</Link>
            </Nav.Item>
          ) : (
            <Nav.Item>
              <Link to="/login">Log In</Link>

              <Link to="/sign-up">Sign Up</Link>
            </Nav.Item>
          )}
        </>
      </Container>
    </Navbar>
  );
};
