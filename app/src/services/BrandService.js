import axios from 'axios';
import { ApiConstants } from '../contants';

const BrandReq = axios.create({
  baseURL: ApiConstants.BACKEND_API.BASE_API_URL
});

const getAllBrands = async () => {
  try {
    const response = await BrandReq.get(ApiConstants.BACKEND_API.BRAND_LIST);
    const data = response?.data?.brands;
    const brands = data.map(brands => brands.name);
    console.log('🔺BrandName:', brands);

    return brands ;
  } catch (error) {
    console.log('🛑Error fetching all Brand:', error);
  }
};

const getSingleBrand = async () => {
  try {
    const response = await BrandReq.get(ApiConstants.BACKEND_API.BRAND_LIST);
    const data = response?.data?.barnds?.[1].name;
    
    console.log('🔺Single Brand', data);

    return data;
  } catch (error) {
    console.log('🛑Error fetching all Brand:', error);
  }
};

export default {
  getAllBrands,
  getSingleBrand
};
