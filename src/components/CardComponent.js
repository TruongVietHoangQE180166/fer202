import React, { useEffect, useState } from "react";
import "../Style/StyleIndex.css";
import { Card, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CardComponent({ addToCart }) {  
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleShowMore = () => {
    navigate('/full-menu');
  };

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api-demo-4gqb.onrender.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        console.log(data);  // Check the structure in console
        setProducts(data.data);  // Access the 'data' array
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">Error: {error}</div>;
  }

  return (
    <div className="container p-5">
      <h1 className="text-left p-3">Our Menu</h1>

      <div className="row">
        {products.map((pizza, index) => (
          <div key={index} className="col-md-3 mb-3">
            <Card>
              <div style={{ position: 'relative' }}>
                <Card.Img variant="top" src={pizza.image} alt={pizza.title} />
                {pizza.salePrice && <span className="card-sale-tag">SALE</span>}
              </div>
              <Card.Body>
                <Card.Title>{pizza.title}</Card.Title>
                <Card.Text>
                  {/* Show salePrice if available, otherwise show regular price */}
                  Price: {pizza.salePrice ? (
                    <>
                      <span className="text-muted text-decoration-line-through">${pizza.price}</span>
                      &nbsp;
                      <span className="text-danger">${pizza.salePrice}</span>
                    </>
                  ) : (
                    <>${pizza.price}</>
                  )}
                </Card.Text>
                <Button 
                  variant="dark" 
                  className="w-100 text-center"
                  onClick={() => addToCart(pizza)}  // Add to cart
                >
                  Buy
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <div className="text-center mt-3">
        <Button variant="dark" onClick={handleShowMore}>
          Show More
        </Button>
      </div>
    </div>
  );
}

export default CardComponent;
