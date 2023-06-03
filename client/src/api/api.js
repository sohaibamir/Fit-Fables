import axios from "axios";

export async function loginApi(email, password) {
  return axios.post(`${process.env.REACT_APP_API}/user/login`, {
    email,
    password,
  });
}

export async function signupApi(name, email, password) {
  return axios.post(`${process.env.REACT_APP_API}/user/signup`, {
    name,
    email,
    password,
  });
}

export async function getUserApi() {
  return axios.get(`${process.env.REACT_APP_API}/user/loggedInUser`);
}

export async function getAllCategories() {
  return axios.get(`${process.env.REACT_APP_API}/products`);
}

export async function getAllOfferProducts() {
  return axios.get(`${process.env.REACT_APP_API}/products/offer`);
}

export async function getAllProductsByCategory(
  category,
  page,
  filterArr,
  sortBy
) {
  let brands = "";
  filterArr.forEach((el) => {
    brands += `&brand=${el}`;
  });
  console.log(brands);
  return axios.get(
    `${process.env.REACT_APP_API}/products/category/${category}?page=${page}${brands}&sortBy=actual_price&sortOrder=${sortBy}`
  );
}
export async function getAllProductsBySubCategory(
  page,
  subcategory,
  category,
  filterArr,
  sortBy
) {
  let brands = "";
  filterArr.forEach((el) => {
    brands += `&brand=${el}`;
  });
  return axios.get(
    `${process.env.REACT_APP_API}/products/category/${category}/${subcategory}?page=${page}${brands}&sortBy=actual_price&sortOrder=${sortBy}`
  );
}
export async function getSingleProduct(id) {
  return axios.get(`${process.env.REACT_APP_API}/products/single/${id}`);
}

export async function AddItemToCart(id, quantity, userId) {
  return axios.post(`${process.env.REACT_APP_API}/cart/${userId}`, {
    productId: id,
    quantity,
  });
}

export async function getUserCart(userId) {
  return axios.get(`${process.env.REACT_APP_API}/cart/${userId}`);
}

export async function updateCartItem(id, quantity, userId) {
  return axios.patch(`${process.env.REACT_APP_API}/cart/${id}/${userId}`, {
    quantity,
  });
}
export async function deleteCartItem(id, userId) {
  return axios.delete(`${process.env.REACT_APP_API}/cart/${id}/${userId}`);
}

export async function getSearchProducts(q) {
  return axios.get(`${process.env.REACT_APP_API}/products/search?q=${q}`);
}
export async function createOrder() {
  return axios.get(`${process.env.REACT_APP_API}/orders/create`);
}

export async function getOrders() {
  return axios.get(`${process.env.REACT_APP_API}/orders`);
}

export async function createProduct(product) {
  return axios.post(`${process.env.REACT_APP_API}/products/create`, product);
}

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const loginAPI = "http://localhost:8000/user/login";
export const signupAPI = "http://localhost:8000/user/signup";
export const checkLoggedInAPI = "http://localhost:8000/checkLoggedIn/";
