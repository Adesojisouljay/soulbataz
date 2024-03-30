import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../redux/cartSlice';
import { CheckoutModal } from '../components/payment-modal/PaymentModal';
import { initializePaystack } from '../api/paystack';
import { getAllProducts, addProductToCart, createPaymentRecord } from '../api/soulbataz';
import { handlePayment } from '../api/paystack';
import { useSelector } from 'react-redux';
import './products.css';

export const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const global = useSelector((state)=> state)

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [footwearArray, setFootwearArray] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProducts();
        setFootwearArray(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }; 

  const handleAddToCart = async (productItem) => {
    try {
      const product = {
          productId: productItem._id,
          imageUrl: productItem.imageUrl,
          price: productItem.price,
          color: productItem.color,
          category: productItem.category,
          description: productItem.description,
          available: productItem.available
      };
  
      const data = await addProductToCart(product);
      console.log(data);
    } catch (error) {
      console.error('Adding item to cart failed:', error);
    }
  };  

  const redirectToProduct123 = (id) => {
    navigate(`/products/${id}`);
  };

  const filterProducts = (category) => {
    setSelectedCategory(category);
  };
  
  const filteredProducts = selectedCategory === 'All' ? footwearArray : footwearArray.filter(product => product.category === selectedCategory);

  return (
    <div className='products'>
      <div className='top-wrapper'>
        <h1 className='products-title'>All Products</h1>
        <div className="recommended">
          <button className={`recommended-button ${selectedCategory === 'All' ? 'active' : ''}`} onClick={() => filterProducts('All')}>All</button>
          <button className={`recommended-button ${selectedCategory === 'Shoe' ? 'active' : ''}`} onClick={() => filterProducts('Shoe')}>Shoes</button>
          <button className={`recommended-button ${selectedCategory === 'Sandal' ? 'active' : ''}`} onClick={() => filterProducts('Sandal')}>Sandals</button>
          <button className={`recommended-button ${selectedCategory === 'Pam' ? 'active' : ''}`} onClick={() => filterProducts('Pam')}>Pams</button>
          <button className={`recommended-button ${selectedCategory === 'Official' ? 'active' : ''}`} onClick={() => filterProducts('Official')}>Officials</button>
        </div>
      </div>
      <div className="products-wrapper">
        {filteredProducts.map((product) => (
          <div key={product._id} className="product-wrapper">
            <img src={product.imageUrl} alt="" className='the-product' onClick={() => redirectToProduct123(product._id)} />
            <div className="product-info">
              <span>Price: {product.price}</span>
              <span>Color: {product.color}</span>
              <span>Category: {product.category}</span>
            </div>
            <div className="product-action">
              <button className='action-button' onClick={() => handlePayment(product)}>Buy</button>
              <button className='action-button' onClick={()=> handleAddToCart(product)}>Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
