import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { footwearArray } from '../sample-db/db';
import { arrowRightSvg, arrowLeftSvg } from '../components/images/svg';
import './home.css';

export const Home = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    const shuffledProducts = [...footwearArray].sort(() => Math.random() - 0.5);
    setRandomProducts(shuffledProducts);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === randomProducts.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? randomProducts.length - 1 : prevIndex - 1));
  };

  const redirectToProduct = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="home-container">
      <div className="test-home">
        <div className="home-top">
          <h1>Welcome to the world class footwear store</h1>
          <h4 className="moving-text">Discover amazing products and enjoy great deals! Discover amazing products and enjoy great deals! Discover amazing products and enjoy great deals!</h4>
        </div>
        <div className="home-cover">
          <div className="cover-left">
            <div className="cover-left-wrapper">
              <h2>Let's make your feet beautiful</h2>
              <h3>You deserve what's good</h3>
              <h3>We have a match for your feet. Our products take you to places where you spread the good news</h3>
            </div>
          </div>
          <div className="cover-right">
            <div className="cover-image-wrapper">
              <span className='home-svg' onClick={handlePrev}>{arrowLeftSvg}</span>
              <img src={randomProducts[currentIndex]?.imageUrl} className='cover-image' alt={`Product ${currentIndex + 1}`} />
              <span className='home-svg' onClick={handleNext}>{arrowRightSvg}</span>
            </div>
            <button className='home-check-button'>Check out</button>
          </div>
        </div>
      </div>
      <div className="home-products-title">
        <h2>Our products</h2>
      </div>
      <div className="featured-products">
        {randomProducts.map((product) => (
          <div key={product.id} className="home-product">
            <img src={product?.imageUrl} alt={`Product ${product.id}`} onClick={() => redirectToProduct(product.id)} />
            <div className="home-product-info">
              <h2>{product.category}</h2>
              <div className="home-more-info">
                <p>Price: {product.price}</p>
                <p>Color: {product.color}</p>
              </div>
              <div className="home-button-wrapper">
                <button className='home-product-button' onClick={() => redirectToProduct(product.id)}>Buy</button>
                <button className='home-product-button'>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Products</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Connect With Us</h3>
            <ul>
              <li><a href="#"><i className="fab fa-facebook-f"></i> Facebook</a></li>
              <li><a href="#"><i className="fab fa-twitter"></i> Twitter</a></li>
              <li><a href="#"><i className="fab fa-instagram"></i> Instagram</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Subscribe</h3>
            <p>Subscribe to our newsletter for exclusive offers and updates.</p>
            <form className='footer-form'>
              <input type="email" placeholder="Enter your email" className='footer-input'/>
              <button className='footer-button'>Subscribe</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Soulbataz. All Rights Reserved.</p>
        </div>
      </footer>
  </div>
  )
}
