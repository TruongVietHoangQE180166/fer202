import React, { useState } from 'react'; // Thêm useState để quản lý giỏ hàng
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/NavbarComponent";
import CarouselComponent from "./components/CarouselComponent";
import CardComponent from "./components/CardComponent";
import ReservationForm from "./components/ReservationForm";
import WebFooter from "./components/WebFooter";
import FullMenu from "./components/FullMenu";

function App() {
  const [cartItems, setCartItems] = useState([]); // Quản lý giỏ hàng

  // Hàm để thêm sản phẩm vào giỏ hàng
  const addToCart = (pizza) => {
    const existingItem = cartItems.find(item => item.name === pizza.title);
    if (existingItem) {
      // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
      setCartItems(cartItems.map(item => 
        item.name === pizza.title ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      // Nếu chưa có, thêm sản phẩm mới vào giỏ hàng
      setCartItems([...cartItems, { name: pizza.title, quantity: 1 }]);
    }
  };

  return (
    <Router>
      <div className="bg-dark-subtle">
        <Navbar cartItems={cartItems} setCartItems={setCartItems} />
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <CarouselComponent />
                <CardComponent addToCart={addToCart} /> {/* Truyền hàm addToCart cho CardComponent */}
                <ReservationForm />
              </>
            } 
          />
          <Route path="/full-menu" element={<FullMenu />} />
        </Routes>
        <WebFooter />
      </div>
    </Router>
  );
}

export default App;
