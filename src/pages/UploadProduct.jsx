import React, { useState } from 'react';
import axios from 'axios';
import { createProduct } from '../api/soulbataz';
import './upload.css';

export const UploadProduct = () => {
  const [productData, setProductData] = useState({
    productName: '',
    description: '',
    price: '',
    imageFile: null
  });
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductData(prevState => ({
      ...prevState,
      imageFile: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productData.productName || !productData.description || !productData.price || !productData.color || !productData.size || !productData.category || !productData.imageFile) {
      setError('Please fill out all fields');
      return;
    }

    try {
      if (productData.imageFile) {
        const formData = new FormData();
        formData.append('file', productData.imageFile);
        formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);

        const response = await axios.post(
          process.env.REACT_APP_CLOUDINARY_URL,
          formData
        );

        const imageUrl = response.data.secure_url;

        const newProductData = {
          ...productData,
          imageUrl 
        };

        const newProduct = await createProduct(newProductData);
        console.log('New product created:', newProduct);
      }
    } catch (error) {
      console.error('Error creating product:', error);
      setError(error.response.data.message)
    }
  };

  return (
    <div className="product-upload-container">
      <h2>Product Upload</h2>
      {error && <span className='error'>{error}</span>}
      <div className="upload-wrapper">
        <div className='upload-preview'>
            {productData.imageFile && (
                <div className="uploaded-image-section">
                    <h2>Product Preview</h2>
                    <img src={URL.createObjectURL(productData.imageFile)} alt="Uploaded Product" className='uploaded-image' />
                    <h3>Product: {productData.productName}</h3>
                    <h3>Description: {productData.description}</h3>
                    <h3>Price: #{productData.price}</h3>
                    <h3>Color: {productData.color}</h3>
                    <h3>Size: {productData.Size}</h3>
                    <h3>Category: {productData.category}</h3>
                </div>
            )}
        </div>
        <div className="upload-form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <label htmlFor="productName">Product Name</label>
                <input
                    className='upload-input'
                    type="text"
                    id="productName"
                    name="productName"
                    value={productData.productName}
                    onChange={handleChange}
                />
                </div>
                <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                className='upload-textarea'
                    id="description"
                    name="description"
                    value={productData.description}
                    onChange={handleChange}
                ></textarea>
                </div>
                <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                    className='upload-input'
                    type="text"
                    id="price"
                    name="price"
                    value={productData.price}
                    onChange={handleChange}
                />
                <label htmlFor="price">Color</label>
                <input
                    className='upload-input'
                    type="text"
                    id="color"
                    name="color"
                    value={productData.color}
                    onChange={handleChange}
                />
                <label htmlFor="price">Size</label>
                <input
                    className='upload-input'
                    type="text"
                    id="size"
                    name="size"
                    value={productData.size}
                    onChange={handleChange}
                />
                <label htmlFor="price">Category</label>
                <input
                    className='upload-input'
                    type="text"
                    id="category"
                    name="category"
                    value={productData.category}
                    onChange={handleChange}
                />
                </div>
                <div className="form-group">
                <label htmlFor="imageFile">Product Image</label>
                <input
                    className='upload-input'
                    type="file"
                    id="imageFile"
                    name="imageFile"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                </div>
                <button type="submit" className='upload-button'>Upload Product</button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default UploadProduct;
