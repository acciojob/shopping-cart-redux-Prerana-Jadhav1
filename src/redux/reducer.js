import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_QTY,
  DECREASE_QTY,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  MOVE_TO_WISHLIST,
  APPLY_COUPON,
} from "./actions";

export const COUPONS = {
  SAVE10: 10,
  SAVE20: 20,
};

const initialState = {
  cart: [],
  wishlist: [],
  discountPercent: 0,
  couponCode: "",
  couponError: "",
};

const shoppingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const existing = state.cart.find((item) => item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, qty: 1 }],
        wishlist: state.wishlist.filter((item) => item.id !== action.payload.id),
      };
    }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case INCREASE_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload ? { ...item, qty: item.qty + 1 } : item
        ),
      };

    case DECREASE_QTY:
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.payload ? { ...item, qty: item.qty - 1 } : item
          )
          .filter((item) => item.qty > 0),
      };

    case ADD_TO_WISHLIST: {
      const alreadyInWishlist = state.wishlist.some((item) => item.id === action.payload.id);
      if (alreadyInWishlist) return state;
      return { ...state, wishlist: [...state.wishlist, action.payload] };
    }

    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item.id !== action.payload),
      };

    case MOVE_TO_WISHLIST: {
      const item = state.cart.find((cartItem) => cartItem.id === action.payload);
      if (!item) return state;
      const alreadyInWishlist = state.wishlist.some((w) => w.id === item.id);
      return {
        ...state,
        cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
        wishlist: alreadyInWishlist
          ? state.wishlist
          : [...state.wishlist, { id: item.id, name: item.name, color: item.color, size: item.size, price: item.price, image: item.image }],
      };
    }

    case APPLY_COUPON: {
      const code = action.payload.trim().toUpperCase();
      if (!code) {
        return { ...state, couponCode: "", discountPercent: 0, couponError: "" };
      }
      if (COUPONS[code]) {
        return { ...state, couponCode: code, discountPercent: COUPONS[code], couponError: "" };
      }
      return { ...state, couponCode: code, discountPercent: 0, couponError: "Invalid coupon code" };
    }

    default:
      return state;
  }
};

export default shoppingReducer;
