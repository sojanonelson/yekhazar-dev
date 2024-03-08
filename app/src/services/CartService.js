import axios from "axios";
import { ApiConstants } from "../contants";


const CartReq = axios.create({
  baseURL: ApiConstants.BACKEND_API.BASE_API_URL,
});


const getCartId = async ( products, token ) => {
    console.log("Tokenn:", token)
  try {
    const response = await CartReq.post(
        ApiConstants.BACKEND_API.CART_ADD,
        {
          products: products,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

    console.log("Tokenn:", token)
    console.log("REQUEST:", response)
    
    if (response.status >= 200 && response.status < 300) {
      
      
      console.log("🔺Cart ID", response.data);

      return response.data;
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (err) {
    console.error("Error while adding products to cart:", err);
    throw err;
  }
};

export default {
  getCartId,
};
