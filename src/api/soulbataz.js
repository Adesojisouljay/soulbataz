import axios from "axios";

const BASE_URL = 'http://localhost:9000/api';
const token = localStorage.getItem("soulbataz_token")

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signup`, userData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const userLogin = async (loginData) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, loginData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      return response.data;
    } catch (error) {
      console.error('Error logging in user:', error);
      throw error;
    }
  };

  export const getAllProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/products`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };

  export const createProduct = async (productData) => {
    try {
      const response = await axios.post(`${BASE_URL}/products`, productData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  };

  //CART
  export const addProductToCart = async (product) => {
    console.log(token)
    try {
      const response = await axios.post(`${BASE_URL}/cart`, { product }, {
        headers: {
          Authorization: token
        }
      });
      
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  };  

  export const getAllUserCarts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/cart`, {
        headers: {
          Authorization: token
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error fetching user carts:', error);
      throw error;
    }
  };
  
  export const removeItemFromCart = async (productId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/cart/${productId}`, {
        headers: {
          Authorization: token
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error removing item from cart:', error);
      throw error;
    }
  };

  export const clearUserCart = async () => {
    try {
      const response = await axios.delete(`${BASE_URL}/cart/items/clear`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response)
      return response.data;
    } catch (error) {
      console.error('Error clearing user cart:', error);
      throw error;
    }
};

export const createPaymentRecord = async (paymentData) => {
  try {
    const response = await axios.post(`${BASE_URL}/payment/init`, paymentData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error creating payment record:', error);
    throw error;
  }
};