import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container, Badge } from "react-bootstrap";
import { FaShoppingCart } from 'react-icons/fa'; // Import icon giỏ hàng
import Cart from './Cart'; // Import thành phần Cart

function NavbarComponent({ cartItems, setCartItems }) {
  const [showModal, setShowModal] = useState(false); // Tạo state điều khiển modal
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0); // Tính tổng số lượng giỏ hàng

  const handleShow = () => setShowModal(true);  // Hàm để mở modal
  const handleClose = () => setShowModal(false);  // Hàm để đóng modal

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

            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Find your pizza..."
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-light">Search</Button>
            </Form>

            <Nav>
              {/* Phần giỏ hàng với biểu tượng và số lượng */}
              <Nav.Link onClick={handleShow} style={{ cursor: 'pointer' }}> {/* Thêm sự kiện onClick */}
                <FaShoppingCart size={24} />
                {totalItems > 0 && <Badge pill bg="danger">{totalItems}</Badge>}
              </Nav.Link>
              
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Gọi Cart và truyền state điều khiển modal */}
      <Cart cartItems={cartItems} setCartItems={setCartItems} showModal={showModal} handleClose={handleClose} />
    </>
  );
}

export default NavbarComponent;
