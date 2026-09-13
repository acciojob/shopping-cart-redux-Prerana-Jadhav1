import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions";
import PRODUCTS from "../redux/products";

const Products = () => {
  const dispatch = useDispatch();

  return (
    <div className="products-section">
      <h2>All Products</h2>
      <p className="section-subtitle">All Products that available to order</p>
      <div className="products-grid">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="product-card">
            <img className="product-image" src={product.image} alt={product.name} />
            <p className="product-meta">
              {product.name.split(" ")[0].toUpperCase()} - {product.color.toUpperCase()}
            </p>
            <h4 className="product-name">{product.name}</h4>
            <p className="product-price">Rs {product.price}</p>
            <button
              className="button add-to-cart-btn"
              onClick={() => dispatch(addToCart(product))}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
