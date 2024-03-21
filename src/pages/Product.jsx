import React, { useEffect, useState } from 'react';
import { fillStartSvg } from '../components/images/svg';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllProducts } from '../api/soulbataz';
import './product.css';

export const Product = () => {
    const params = useParams();
    const global = useSelector((state)=> state)

    const [productId, setProductId] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null); 
    const [footwearArray, setFootwearArray] = useState([]);

    const categories = [...new Set(footwearArray.map(product => product.category))];

    useEffect(() => {
        console.log(params)
        if (!productId) {
            setProductId((params.id));
        }
    }, [productId, params.id]);

    useEffect(() => {
        console.log(localStorage.getItem("token"))
        const fetchProducts = async () => {
          try {
            const productsData = await getAllProducts();
            console.log(productsData)
            setFootwearArray(productsData);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
    
        fetchProducts();
      }, []);

        const selectedProduct = footwearArray.find(product => product?._id === productId);
    
    const similarProducts = selectedProduct ? footwearArray.filter(product => {
        if (selectedCategory) {
            return product.category === selectedCategory && product.id !== productId;
        } else {
            return product.id !== productId;
        }
    }) : [];
    
    useEffect(() => {
        if (selectedProduct) {
            setSelectedCategory(selectedProduct.category);
        }
    }, [selectedProduct]);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <div className='product'>
            <div className="product-left">
                <div className="left-wrapper">
                    <div className="info-extra">
                        <h1>{selectedProduct?.category}</h1>
                    </div>
                    <div className="the-product-wrapper">
                        <img src={selectedProduct?.imageUrl} alt="" className='the-product-purchase'/>
                    </div>
                    <div className="the-product-info">
                        <div className="info-more">
                            <span>Color: {selectedProduct?.color}</span>
                            <span>Size: {selectedProduct?.size}</span>
                            <span>Available: {selectedProduct?.available ? 'Yes' : 'No'}</span>
                            <div className="rating">
                                <div>
                                    <h3>Rate</h3>
                                </div>
                                <div className="rating-stars">
                                    <span>{fillStartSvg}</span>
                                    <span>{fillStartSvg}</span>
                                    <span>{fillStartSvg}</span>
                                    <span>{fillStartSvg}</span>
                                    <span>{fillStartSvg}</span>
                                </div>
                            </div>
                        </div>
                        <div className="action-contact">
                            <div className="info-action">
                                <button className='action-button'>Buy Now</button>
                                <button className='action-button'>Add to cart</button>
                            </div>
                            <div className="contact-purchase">
                                <span>Tel: 08160035535</span>
                                <span>Email: adesoji@gmail.com</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="product-right">
                <div className="similar-products">
                    <h1>Similar Products</h1>
                    <div className="filter">
                        <select value={selectedCategory} onChange={handleCategoryChange}>
                            <option value="">All Categories</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                    {similarProducts.map(product => (
                        <div key={product.id} className="simillar-top">
                            <div>
                                <img src={product.imageUrl} alt="" className='the-product-similar' />
                            </div>
                            <div className="similar-info">
                                <h3>{product.description}This is a sample footwear, it is of high quality</h3>
                                <div className="similar-price-action">
                                    <div className='similar-info'>
                                        <span>Price: {product.price}</span>
                                        <span>Color: {product.color}</span>
                                        <span>Available: {product.available ? 'Yes' : 'No'}</span>
                                    </div>
                                    <div className="similar-action">
                                        <button className='similar-button'>Buy Now</button>
                                        <button className='similar-button'>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
