import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container, Badge } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import Cart from "./Cart";
import LoginComponent from "./LoginComponent";

function NavbarComponent({ cartItems, setCartItems }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const onLoginSuccess = (user) => {
    setIsLoggedIn(true);
    console.log("User logged in:", user);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCartItems([]);
  };

  return (
    <>
      <Navbar className="navbar navbar-dark bg-dark" expand="lg" fixed="top">
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
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">Menu</Nav.Link>
              <Nav.Link href="#">Deals</Nav.Link>
              <Nav.Link href="#">About Us</Nav.Link>
              <Nav.Link href="#">Contact</Nav.Link>
            </Nav>

            {/* Form Tìm kiếm */}
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Find your pizza..."
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-light">Search</Button>
            </Form>

            {/* Sử dụng Nav thay cho div */}
            <Nav className="align-items-center ms-0">
              {isLoggedIn && (
                <Nav.Link onClick={() => setShowCartModal(true)} style={{ cursor: "pointer" }} className="me-1">
                  <FaShoppingCart size={24} />
                  {totalItems > 0 && <Badge pill bg="danger">{totalItems}</Badge>}
                </Nav.Link>
              )}

              {isLoggedIn ? (
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
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Button variant="outline-light" onClick={() => setShowLoginModal(true)} className="ms-3">
                  Login
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal Giỏ Hàng */}
      <Cart cartItems={cartItems} setCartItems={setCartItems} showModal={showCartModal} handleClose={() => setShowCartModal(false)} />

      {/* Modal Đăng Nhập */}
      <LoginComponent
        modalOpen={showLoginModal}
        toggleModal={() => setShowLoginModal(false)}
        onLoginSuccess={onLoginSuccess}
      />
    </>
  );
}

export default NavbarComponent;
