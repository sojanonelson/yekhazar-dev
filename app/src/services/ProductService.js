import axios from "axios";
import { ApiConstants } from "../contants";

const ProductReq = axios.create({
  baseURL: ApiConstants.BACKEND_API.BASE_API_URL,
});

const getAllProduct = async () => {
  const params = {
    name: "all",
    category: "all",
    brand: "all",
    min: 1,
    max: 2500,
    rating: 0,
    order: 0,
    page: 1,
    limit: 10,
    sortOrder: JSON.stringify({ _id: -1 }),
  };

  try {
    const response = await ProductReq.get(
      ApiConstants.BACKEND_API.PRODUCT_LIST,
      { params }
    );

    console.log("PRODUCTS:", response?.data);
    console.log("Product Done✅");
    return response?.data?.products;
  } catch (error) {
    console.error("🛑Error fetching products: ", error);
  }
};

const getSingleProductByCategory = async (product) => {
  try {
    const params = {
      name: "all",
      category: product,
      brand: "all",
      min: 1,
      max: 2500,
      rating: 0,
      order: 0,
      page: 1,
      limit: 10,
      sortOrder: JSON.stringify({ _id: -1 }),
    };

    const response = await ProductReq.get(
      ApiConstants.BACKEND_API.PRODUCT_LIST,
      { params }
    );

    console.log("Single product fetching done..");
    return response?.data;
  } catch (error) {
    console.error("🛑Single Fetching Error: ", error);
  }
};

const getSingleProductBySlug = async (slug) => {
  try {
     console.log("SLUG:", slug)
     
     console.log("API:", ApiConstants.BACKEND_API.PRODUCT_BY_SLUG, {slug}); 
   
    const response = await ProductReq.get(`${ApiConstants.BACKEND_API.PRODUCT_BY_SLUG}${slug}`);

    console.log("Response:", response);
    return response;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    throw error;
  }
};

const categoryProduct = async () => {
  try {
  } catch (error) {
    console.error("🛑Category Products Error", error);
  }
};

export default {
  getAllProduct,
  getSingleProductByCategory,
  getSingleProductBySlug,
};
