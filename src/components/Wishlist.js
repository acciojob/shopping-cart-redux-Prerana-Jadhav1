import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromWishlist } from "../redux/actions";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);

  return (
    <div className="wishlist-section">
      <h2>Wishlists</h2>
      <p className="section-subtitle">All Your Favorite Products</p>
      {wishlist.length === 0 ? (
        <p className="empty-text">Your wishlist is empty.</p>
      ) : (
        <div className="products-grid">
          {wishlist.map((product) => (
            <div key={product.id} className="product-card">
              <img className="product-image" src={product.image} alt={product.name} />
              <h4 className="product-name">{product.name}</h4>
              <p className="product-price">Rs {product.price}</p>
              <button
                className="button add-to-cart-btn"
                onClick={() => dispatch(addToCart(product))}
              >
                Add To Cart
              </button>
              <button
                className="link-btn remove-wishlist-btn"
                onClick={() => dispatch(removeFromWishlist(product.id))}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
