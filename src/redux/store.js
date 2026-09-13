import { createStore } from "redux";
import shoppingReducer from "./reducer";

const store = createStore(shoppingReducer);

export default store;
