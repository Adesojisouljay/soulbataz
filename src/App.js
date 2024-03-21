import { useEffect } from "react";
import {Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavBar } from "./components/nav-bar/NavBar";
import { Home } from "./pages/Home";
import { SideMenu } from "./components/side-menu/SideMenu";
import { Products } from "./pages/Products";
import { Product } from "./pages/Product";
import { ContactUs } from "./pages/Contact";
import { Bonus } from "./pages/Bonus";
import { About } from "./pages/About";
import { OrderList } from "./pages/Orders";
import { Cart } from "./pages/Cart";
import { Login } from "./pages/Login";
import MiningComponent from "./pages/Mine";
import { Register } from "./pages/Register";
import { UploadProduct } from "./pages/UploadProduct";

const App = () => {
  const globalState = useSelector((state) => state);

    const user = true
    const isAdmin = true

  return (
    <div className="app">
        <NavBar  user={user}/>
      <div className="app-container">
        {globalState.user.isAuthenticated && <div className="side-menu-wrapper">
          <SideMenu isAdmin={isAdmin}/>
        </div>}
        <div className={globalState.user.isAuthenticated ? "app-pages" : "app-pages-full"}>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/products" element={<Products/>} />
            <Route path="/products/:id" element={<Product/>} />
            <Route path="/wallet" element={<Bonus/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/contact" element={<ContactUs/>} />
            <Route path="/orders" element={<OrderList/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/upload" element={<UploadProduct/>} />
            <Route path="/mine" element={<MiningComponent/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
