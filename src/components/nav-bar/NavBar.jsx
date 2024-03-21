import React, { useEffect, useState, useRef } from 'react'
import "./nav-bar.css"
import { SideMenu } from '../side-menu/SideMenu'
import { deleteSvg, cartSvg, searchSvg } from '../images/svg'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/userSlice'
import {  clearCart } from '../../redux/cartSlice'
import logo from "../../assets/soulogo.png"
import { getAllUserCarts, removeItemFromCart, clearUserCart } from '../../api/soulbataz'
import { initializePaystack } from '../../api/paystack'

export const NavBar = () => {
    const dispatch = useDispatch()
    const globalState = useSelector((state)=> state)

    const [showCartDropdown, setShowCartDropdown] = useState(false);
    const [cartItems, setCartItems] = useState([])
    const cartRef = useRef(null);

    useEffect(() => {
        getUserCartItems()
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (cartRef.current && !cartRef.current.contains(event.target)) {
            setShowCartDropdown(false);
        }
    };

    const toggleCartDropdown = () => {
        setShowCartDropdown(!showCartDropdown);
    };

    const handleLogout = () => {
        localStorage.removeItem("token")
        dispatch(logout());
    }

    const getUserCartItems = async ()=> {
        try {
            const data = await getAllUserCarts();
            setCartItems(data.items)
        } catch (error) {
            console.log(error)
        }
    }

    const removeCartItem = async (productId) => {
        try {
          const response = await removeItemFromCart(productId);
          console.log(response)
          getUserCartItems();
        } catch (error) {
          console.error('Error removing item from cart:', error);
        }
      };

    const handleClearCart = async () => {
    try {
        await clearUserCart();
        getUserCartItems();
    } catch (error) {
        console.error('Error clearing cart:', error);
    }
};
    

    return (
        <>
            <div className="navbar">
                    <img src={logo} alt="" className="soul-logo"/>
                <div className="nav-input-wrapper">
                    <input type="text" placeholder='Search a product' className='nav-input' />
                    <span className='nav-search'>{searchSvg}</span>
                </div>
                <div className="log">
                    {globalState?.user.user ? (<div className="cart-wrapper" ref={cartRef}>
                        <div className='new-order'>
                            <span>New order</span>
                        </div>
                        <div className='cart-svg' onClick={toggleCartDropdown}>{cartSvg}</div>
                        <div className='cart-count'>{cartItems.length}</div>
                        {showCartDropdown && (
                                <div className="cart-dropdown">
                                    <div className="cart-dropdown-top">
                                        <h3>Cart Items</h3>
                                        <button onClick={handleClearCart}>Clear cart</button>
                                    </div>
                                    <>
                                        {cartItems.length === 0 ? 
                                            <span>Your cart is empty</span> :
                                            cartItems.map((item) => (
                                                <div key={item._id} className="cart-products">
                                                    <div className="cart-product-image">
                                                        <img src={item.product.imageUrl} alt="" />
                                                    </div>
                                                    <div className="cart-produtc-details">
                                                        <span>Price: {item.product.price}</span>
                                                        <span>Quantity: {item.quantity}</span>
                                                        <span>Total: {item.totalAmount}</span>
                                                    </div>
                                                    <div className="cart-produtc-btn">
                                                        <button onClick={() => initializePaystack(item.totalAmount)}>Pay now</button>
                                                        <span onClick={() => removeCartItem(item._id)}>{deleteSvg}</span>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </>

                                </div>
                            )}
                        </div>
                    ) : (
                        <div className='nav-links'>
                            <Link to={"/"}>Home</Link>
                            <Link to={"/products"}>Products</Link>
                            <Link to={"/contact"}>Contact</Link>
                            <Link to={"/wallet"}>Bonuses</Link>
                            <Link to={"/about"}>About</Link>
                        </div>
                    )}
                    {globalState.user.user ?
                        <button className='log-btn' onClick={handleLogout}>Logout</button> :
                        <div className="nav-no-user">
                            <Link to="/login"><button className='log-btn'>Login</button></Link>
                            <Link to="/register"><button className='log-btn'>Register</button></Link>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
