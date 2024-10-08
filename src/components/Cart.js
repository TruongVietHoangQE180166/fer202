import React from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Cart = ({ cartItems, setCartItems, showModal, handleClose }) => {

  const updateQuantity = (item, quantity) => {
    if (quantity <= 0) {
      setCartItems(cartItems.filter(cartItem => cartItem.name !== item.name));
    } else {
      setCartItems(cartItems.map(cartItem =>
        cartItem.name === item.name ? { ...cartItem, quantity } : cartItem
      ));
    }
  };

  return (
    <>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cartItems.length > 0 ? (
            <Container fluid>
              {cartItems.map((item, index) => (
                <Row key={index} className="align-items-center mb-3">
                  <Col xs={6} className="text-start">
                    <strong>{item.name}</strong>
                  </Col>
                  <Col xs={3} className="text-center">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => updateQuantity(item, item.quantity - 1)} // Giảm số lượng
                    >
                      -
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => updateQuantity(item, item.quantity + 1)} // Tăng số lượng
                    >
                      +
                    </Button>
                  </Col>
                  <Col xs={3} className="text-end">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => updateQuantity(item, 0)} // Xóa sản phẩm
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>
              ))}
            </Container>
          ) : (
            <p>Your cart is empty!</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Proceed to Checkout</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Cart;
