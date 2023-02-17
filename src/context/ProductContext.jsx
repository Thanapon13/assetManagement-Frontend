import { createContext, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/axios";

const ProductContext = createContext();

function ProductContextProvider({ children }) {
  const addToBag = async ({ productOptionId, quantity }) => {
    const res = await axios.post("/cartItems", { productOptionId, quantity });
  };

  return (
    <ProductContext.Provider value={{ addToBag }}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductContextProvider;
export { ProductContext };
