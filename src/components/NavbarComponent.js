import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container } from "react-bootstrap";
import Cart from "./Cart";

 import { ThemeProvider, ThemeContext} from "../context/ThemeContext";
function NavbarComponent({ cartItems, setCartItems }) {
  // Sử dụng ThemeContext
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Thay đổi lớp CSS dựa trên theme
  const themeClass = theme === "light" ? "bg-light navbar-light" : "bg-dark navbar-dark";

  return (
    <>
      <Navbar className={themeClass} expand="lg" fixed="top">
        <Container fluid>
          <Navbar.Brand href="#">
            <img
              src="https://static.vecteezy.com/system/resources/previews/005/285/094/original/pizza-logo-with-illustration-a-piece-of-pizza-free-vector.jpg"
              height="30"
              alt="PizzaWeb Logo"
              loading="lazy"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link href="#" active>Home</Nav.Link>
              <Nav.Link href="#">Menu</Nav.Link>
              <Nav.Link href="#">Deals</Nav.Link>
              <Nav.Link href="#">About Us</Nav.Link>
              <Nav.Link href="#">Contact</Nav.Link>
            </Nav>

            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Find your pizza..."
                className="me-2"
                aria-label="Search"
              />
              <Button variant={theme === "light" ? "dark" : "light"} type="submit">
                Search
              </Button>
            </Form>

            <Nav>
              <Cart cartItems={cartItems} setCartItems={setCartItems} />
              <NavDropdown
                title={
                  <img
                    src="https://cdn2.iconfinder.com/data/icons/people-occupation-job/64/Thief-Stealing-Criminal-Robber-Gangster-Robbery-Avatar-1024.png"
                    className="rounded-circle"
                    height="25"
                    width="25"
                    alt="User Avatar"
                  />
                }
                id="userDropdown"
                align="end"
              >
                <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#">Order History</NavDropdown.Item>
                <NavDropdown.Item href="#">Logout</NavDropdown.Item>
              </NavDropdown>

              {/* Nút chuyển đổi theme */}
              <Button onClick={toggleTheme} variant={theme === "light" ? "secondary" : "light"} className="ms-2">
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComponent;
