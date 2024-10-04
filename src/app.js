// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/NavbarComponent";
import CarouselComponent from "./components/CarouselComponent";
import CardComponent from "./components/CardComponent";
import ReservationForm from "./components/ReservationForm";
import WebFooter from "./components/WebFooter";
import FullMenu from "./components/FullMenu";
import  { ThemeProvider, ThemeContext} from './ThemeContext';

function App() {
  const [cartItems, setCartItems] = useState([]); // Manage the cart

  // Function to add pizza to cart
  const addToCart = (pizza) => {
    const existingItem = cartItems.find(item => item.name === pizza.title);
    if (existingItem) {
      // If pizza already exists in the cart, increase quantity
      setCartItems(cartItems.map(item => 
        item.name === pizza.title ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      // If pizza is new to cart, add it
      setCartItems([...cartItems, { name: pizza.title, quantity: 1 }]);
    }
  };

  return (
    <ThemeProvider> 
      <Router>
        <div className="bg-dark-subtle"> {/* This class will apply the background color */}
          <Navbar cartItems={cartItems} setCartItems={setCartItems} />
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <CarouselComponent />
                  <CardComponent addToCart={addToCart} /> {/* Pass addToCart to CardComponent */}
                  <ReservationForm />
                </>
              } 
            />
            <Route path="/full-menu" element={<FullMenu />} />
          </Routes>
          <WebFooter />
        </div>
      </Router>
    </ThemeProvider> 
  );
}

export default App;
