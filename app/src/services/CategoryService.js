import axios from 'axios';
import { ApiConstants } from '../contants';
const CategoryReq = axios.create({
  baseURL: ApiConstants.BACKEND_API.BASE_API_URL
});

const getAllCategory = async () => {
  try {
    const response = await CategoryReq.get(
      ApiConstants.BACKEND_API.CATEGORY_LIST
    );
    const data = response?.data?.categories;
    const categories = data.map(category => category.slug);
    console.log('🔺slugnames:', categories);

    return categories;
  } catch (error) {
    console.log('🛑Error fetching all category:', error);
  }
};

const getSingleCategory = async () => {
  try {
    const response = await CategoryReq.get(
      ApiConstants.BACKEND_API.CATEGORY_LIST
    );
    const categories = response?.data?.categories?.[1].slug;
    console.log('🔺Single Category');

    return categories;
  } catch (error) {
    console.log('🛑Error fetching all category:', error);
  }
};

export default {
  getAllCategory,
  getSingleCategory
};
