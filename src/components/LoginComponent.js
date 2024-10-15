import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

function LoginComponent({ modalOpen, toggleModal, switchToRegister, onLoginSuccess }) {
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const toggleForgotPasswordModal = () => {
    setShowForgotPasswordModal(!showForgotPasswordModal);
    if (!showForgotPasswordModal) toggleModal();
  };

  const handleCloseForgotPassword = () => {
    setShowForgotPasswordModal(false);
    toggleModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://api-demo-4gqb.onrender.com/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password.");
      }

      const data = await response.json();
      const token = data.token;
      localStorage.setItem("token", token);
      onLoginSuccess(data.user); // Thông báo đăng nhập thành công
      toggleModal();
    } catch (error) {
      setError(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Modal show={modalOpen} onHide={toggleModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="dark" type="submit" className="mt-3 w-100">
              Login
            </Button>
          </Form>
          <div className="mt-3 text-center">
            <p>
              Don't have an account?{" "}
              <Button variant="link" onClick={switchToRegister} className="p-0">
                Register here
              </Button>
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleForgotPasswordModal}>
            Forgot Password
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Forgot Password Modal */}
      <Modal show={showForgotPasswordModal} onHide={handleCloseForgotPassword} centered>
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formForgotPasswordEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseForgotPassword}>
            Close
          </Button>
          <Button variant="dark" type="submit">
            Reset Password
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LoginComponent;
