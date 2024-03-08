import axios from "axios";
import { ApiConstants } from "../contants";

const OrderReq = axios.create({
  baseURL: ApiConstants.BACKEND_API.BASE_API_URL,
});

const getPaymentKey = async () => {
  try {
    const response = await OrderReq.get(ApiConstants.BACKEND_API.PAYMENT_KEY);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const createPaymentOrder = async (total) => {
    console.log("Total:", total);
  try {
    const response = await OrderReq.post(
      ApiConstants.BACKEND_API.CREATE_PAYMENT_ORDER,
      { total: total }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getAllOrder = async (token) => {
  try {
    const response = await OrderReq.get(ApiConstants.BACKEND_API.ALL_ORDER, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getOrderById = async (id, token) => {
  try {
    const config = {
      headers: {
        Authorization: token,
      },
    };

    const response = await OrderReq.get(ApiConstants.BACKEND_API.ORDER_BY_ID + id, config);
    return response.data;
  } catch (error) {
    console.error('Error in getOrderById:', error);
    throw error;
  }
};





export default { getPaymentKey, createPaymentOrder,getAllOrder,getOrderById };
