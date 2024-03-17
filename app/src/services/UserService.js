import axios from "axios";
import { ApiConstants } from "../contants";

const UserReq = axios.create({
  baseURL: ApiConstants.BACKEND_API.BASE_API_URL,
});

const getAddress = async (token) => {
  try {
    const response = await UserReq.get(ApiConstants.BACKEND_API.USER_ADDRESS, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error in getting address : ", error);
  }
};

const addAddress = async (data, token) => {
  console.log("Data for adding  address is ", data);
  try {
    const response = await UserReq.post(
      ApiConstants.BACKEND_API.ADD_ADDRESS,
      data,
      { headers: { Authorization: token } }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const updateAddress = async (data, token, addressId) => {
  try {
    const response = await UserReq.put(
      ApiConstants.BACKEND_API.UPDATE_ADDRESS + addressId,
      data,
      { headers: { Authorization: token } }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const resetPassword = async (oldpassword, newpassword, token) => {
  try {
    const response = await UserReq.post(
      ApiConstants.BACKEND_API.RESET_PASSWORD,
      { password: oldpassword, confirmPassword: newpassword },
      { headers: { Authorization: token } }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const deleteAddress = async (addressId, token) => {
  try {
    const response = await UserReq.delete(
      ApiConstants.BACKEND_API.DELETE_ADDRESS + addressId,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getProfile = async (token) => {
  try {
    const response = await UserReq.get(ApiConstants.BACKEND_API.USER_PROFILE, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {}
};

const updateProfile = async (data, token) => {
  try {
    const response = await UserReq.put(
      ApiConstants.BACKEND_API.UPDATE_PROFILE,
      {
        profile: data,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {}
};

const addReview = async (
  productid,
  title,
  review,
  rating,
  isRecommended,
  token
) => {
  console.log("Data for adding address is ", productid,title,review,rating,isRecommended,token)
  try {
    const response = await UserReq.post(
      ApiConstants.BACKEND_API.ADD_REVIEW,
      {
        product: productid,
        title: title,
        review: review,
        rating: rating,
        isRecommended: "1",
      },
      {
        headers: {
          Authorization: token,
        },
      }
    ).then((res) => res.data);
    console.log("Add Review service:", response);

    return response;
  } catch (err) {
    console.log(err);
  }
};

const getReview = async (slug) => {
  try {
    const response = await UserReq.get(
      ApiConstants.BACKEND_API.GET_REVIEW + slug
    ).then((res) => res.data);
    console.log("Get Review service:", response);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export default {
  getAddress,
  addAddress,
  updateAddress,
  resetPassword,
  deleteAddress,
  updateProfile,
  getProfile,
  addReview,
  getReview,

};
