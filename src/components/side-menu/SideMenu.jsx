import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import "./side-menu.css"
import { arrowRightSvg, closeSvg } from '../images/svg'

export const SideMenu = (props) => {
    const { isAdmin } = props;
    const [sideBar, setSideBar] = useState(true);
    const global = useSelector(state => state)

    const showSideBar = () => setSideBar(!sideBar)

  return (
    <>
    {!sideBar ? <div onClick={showSideBar}>
        <span className='toggle-menu'>{arrowRightSvg}</span>
    </div> :
    <div className={sideBar ? "nav-menu active" : "nav-menu"}>
        <div onClick={showSideBar}>
            <span className='toggle-menu'>{closeSvg}</span>
        </div>
        <div className="top">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPakM0uQl1tWYg1MJ9MjP1ojbHtrUNKGtT3w&usqp=CAU" alt="" className="user-menu" />
            <div>
                <p>Hi,</p>
                <span>{global?.user?.user.username}</span>    
            </div>
        </div>
    <ul className='nav-menu-items'>
        <li className='navbar-toggle'>
        </li>
            <li className='nav-text'>
                <Link to="/products">Products</Link>
            </li>
            <li className='nav-text'>
                <Link to="/orders">Orders</Link>
            </li>
            <li className='nav-text'>
                <Link to="/wallet">Wallet bonuses</Link>
            </li>
            <li className='nav-text'>
                <Link to="/cart">Selected products</Link>
            </li>
            <li className='nav-text'>
                <Link to="/contact">Contact us</Link>
            </li>
            {isAdmin && <li className='nav-text'>
                <Link to="/upload">Upload new product</Link>
            </li>}
            <li className='nav-text'>
                <Link to="/about">About</Link>
            </li>
    </ul>
    <div className="toggle-theme">
        <div className="light">light</div>
        <div className="dark">dark</div>
    </div>
    </div>}
    </>
  )
}
