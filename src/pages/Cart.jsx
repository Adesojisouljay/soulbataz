import React, { useEffect, useState } from 'react';
import { deleteSvg } from '../components/images/svg';
import { useDispatch, useSelector } from 'react-redux';
import { removeItemFromCart, clearCart } from '../redux/cartSlice';
import { getAllUserCarts } from '../api/soulbataz';
import { initializePaystack } from '../api/paystack';
import './cart.css';

export const Cart = () => {

  const [cartItems, setCartItems] = useState([])

  const dispatch = useDispatch()

  useEffect(()=> {
    getUserCartItems()
    console.log(cartItems)
  }, [])

  const getUserCartItems = async ()=> {
    try {
        const data = await getAllUserCarts();
        console.log(data.items)
        setCartItems(data.items)
    } catch (error) {
        console.log(error)
    }
}
      
  return (
    <div className="cart-container">
      <div className="cart-top">
        <div className="cart-left-wrapper">
          <h2>Shopping Cart</h2>
        </div>
        {cartItems?.length > 0 && <div className="cart-right-wrapper">
          <button onClick={()=> dispatch(clearCart())}>Clear cart</button>
        </div>}
      </div>
      {cartItems?.length === 0 ? (
        <div className="empty-cart">Your cart is empty</div>
      ) : (
        <div>
          {cartItems?.map((item, index) => (
            <div key={item._id} className="cart-item">
              <div className="cart-items-wrapper">
                <div className="cart-product-wrapper">
                  <img src={item.product.imageUrl} alt={item.product.category} className="cart-item-image" />
                  <div className="cart-item-details">
                    <div className="cart-item-type">{item.product.category}</div>
                    <div className="cart-item-price">${item.product.price}</div>
                  </div>
                </div>
                  <div className="cart-item-quantity">
                    <span>{item.quantity}</span>
                  </div>
                  <div className="cart-item-svg">
                    <button className='cart-buy' onClick={() => initializePaystack(item.totalAmount)}>Buy Now</button>
                    <span onClick={()=> dispatch(removeItemFromCart(item.id))}>{deleteSvg}</span>
                  </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
