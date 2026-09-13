
import React from "react";
import Products from "./Products";
import Wishlist from "./Wishlist";
import Cart from "./Cart";
import './../styles/App.css';

const App = () => {
  return (
    <div>
        {/* Do not remove the main div */}
        <div className="app-layout">
          <div className="left-panel">
            <Products />
            <Wishlist />
          </div>
          <div className="right-panel">
            <Cart />
          </div>
        </div>
    </div>
  )
}

export default App
