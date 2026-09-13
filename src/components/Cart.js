import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  moveToWishlist,
  applyCoupon,
} from "../redux/actions";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, discountPercent, couponError, couponCode } = useSelector((state) => state);
  const [couponInput, setCouponInput] = useState("");

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const temporaryAmount = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart]
  );

  const discountAmount = useMemo(
    () => Math.round((temporaryAmount * discountPercent) / 100),
    [temporaryAmount, discountPercent]
  );

  const totalAmount = temporaryAmount - discountAmount;

  const handleApplyCoupon = () => {
    dispatch(applyCoupon(couponInput));
  };

  return (
    <div className="cart-section">
      <div className="cart-items">
        <h2>Cart ( {totalItems} Items )</h2>
        {cart.length === 0 ? (
          <p className="empty-text">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <h4>{item.name}</h4>
                <p className="cart-item-meta">
                  COLOR: {item.color.toUpperCase()} SIZE: {item.size}
                </p>
                <div className="cart-item-actions">
                  <button
                    className="qty-btn decrease-qty-btn"
                    onClick={() => dispatch(decreaseQty(item.id))}
                  >
                    -
                  </button>
                  <span className="qty-value">{item.qty}</span>
                  <button
                    className="qty-btn increase-qty-btn"
                    onClick={() => dispatch(increaseQty(item.id))}
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-links">
                  <button
                    className="link-btn remove-item-btn"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Remove Item
                  </button>
                  <button
                    className="link-btn move-wishlist-btn"
                    onClick={() => dispatch(moveToWishlist(item.id))}
                  >
                    Move To Wishlist
                  </button>
                </div>
              </div>
              <p className="cart-item-price">Rs {item.price * item.qty}</p>
            </div>
          ))
        )}
      </div>

      <div className="cart-summary">
        <h3>The Total Amount Of</h3>
        <div className="summary-row">
          <span>Temporary Amount</span>
          <span>Rs {temporaryAmount}</span>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        {discountPercent > 0 && (
          <div className="summary-row discount-row">
            <span>Discount ({couponCode})</span>
            <span>- Rs {discountAmount}</span>
          </div>
        )}
        <div className="summary-row total-row">
          <span>Total Amount (including VAT)</span>
          <span>Rs {totalAmount}</span>
        </div>
        <button className="button checkout-btn">Go To Checkout</button>

        <div className="coupon-section">
          <input
            type="text"
            className="coupon-input"
            placeholder="Add a discount code (optional)"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
          />
          <button className="button apply-coupon-btn" onClick={handleApplyCoupon}>
            Apply
          </button>
        </div>
        {couponError && <p className="error-message">{couponError}</p>}
      </div>
    </div>
  );
};

export default Cart;
