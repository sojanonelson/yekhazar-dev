const config = require("../../package.json").projectConfig;
const BACKEND_BASE_URL = config.backendApiBaseUrl;

const COUNTRY_FLAG = {
  BASE_URL: `https://flagsapi.com`,
  SIZE: { 16: "16", 24: "24", 32: "32", 48: "48", 64: "64" },
  STYLE: { FLAT: "flat", SHINY: "shiny" },
};

const BACKEND_API = {
  BASE_API_URL: `${BACKEND_BASE_URL}/api`,
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  FORGOT_PASSWORD: "/auth/forgot",

  CATEGORY_LIST: "/category/list",

  BRAND_LIST: "brand/list",
  PRODUCT_LIST: "product/list",
  PRODUCT_BY_SLUG: "product/item/",
  GET_REVIEW: "review/",
  ADD_REVIEW: "review/add",

  CART_ADD: "cart/add",

  PAYMENT_KEY: "payment/get-payment-key/",
  CREATE_PAYMENT_ORDER: "payment/create-payment-orders/",

  USER_ADDRESS: "/address",
  UPDATE_PROFILE:"/user/",
  RESET_PASSWORD:"/auth/reset/",
  USER_PROFILE:"user/me",
  ADD_ADDRESS: "address/add",
  UPDATE_ADDRESS: "/address/",
  DELETE_ADDRESS: "/address/delete/",
  ALL_ORDER: "order/me",
  ORDER_BY_ID: "order/",
};

const AUTH = { LOGIN: "/auth/login", REGISTER: "/auth/register" };

export default { COUNTRY_FLAG, BACKEND_API };
