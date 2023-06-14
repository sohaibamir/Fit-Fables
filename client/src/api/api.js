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

export async function getAllOfferProducts(page, sortBy) {
  return axios.get(
    `${process.env.REACT_APP_API}/products/offer?page=${page}&sortBy=actual_price&sortOrder=${sortBy}`
  );
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

export async function getLatestProducts() {
  return axios.get(`${process.env.REACT_APP_API}/products/latest`);
}

export async function getMostSellingProducts() {
  return axios.get(`${process.env.REACT_APP_API}/products/mostselling`);
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

export async function updateProduct(id, product) {
  return axios.put(`${process.env.REACT_APP_API}/update/product/${id}`, {
    product: product,
  });
}

export async function deleteProduct(id) {
  return axios.delete(
    `${process.env.REACT_APP_API}/admin/delete/product/${id}`
  );
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
export async function createOrder(userId, totalPrice) {
  return axios.post(`${process.env.REACT_APP_API}/orders/create/${userId}`, {
    totalPrice,
  });
}

export async function getOrders(userId) {
  return axios.get(`${process.env.REACT_APP_API}/orders/${userId}`);
}

export async function getOrderById(id) {
  return axios.get(`${process.env.REACT_APP_API}/admin/orders/${id}`);
}

export async function updateOrderById(id, status) {
  return axios.patch(`${process.env.REACT_APP_API}/admin/update-order/${id}`, {
    status,
  });
}

export async function getProductsOfSingleOrder(id) {
  return axios.get(
    `${process.env.REACT_APP_API}/admin/orders/getProducts/${id}`
  );
}

export async function createProduct(product) {
  return axios.post(`${process.env.REACT_APP_API}/products/create`, product);
}

export async function getAllProductsAdmin() {
  return axios.get(`${process.env.REACT_APP_API}/products/all`);
}

export async function getAllUsersAdmin() {
  return axios.get(`${process.env.REACT_APP_API}/admin/getUsers`);
}

export async function getAllOrdersAdmin() {
  return axios.get(`${process.env.REACT_APP_API}/admin/getAllOrders`);
}

export async function getUserById(id) {
  return axios.get(`${process.env.REACT_APP_API}/admin/getuser/${id}`);
}

export async function createDoctor(doctor) {
  return axios.post(`${process.env.REACT_APP_API}/admin/doctor/create`, doctor);
}

export async function getDoctorById(id) {
  return axios.get(`${process.env.REACT_APP_API}/admin/doctors/${id}`);
}

export async function updateDoctor(id, doctor) {
  return axios.put(`${process.env.REACT_APP_API}/update/doctor/${id}`, {
    doctor,
  });
}

export async function deleteDoctor(id) {
  return axios.delete(`${process.env.REACT_APP_API}/admin/delete/doctor/${id}`);
}

export async function getAllDoctorsAdmin() {
  return axios.get(`${process.env.REACT_APP_API}/doctors/all`);
}

export async function getcustomerOrders(id) {
  return axios.get(
    `${process.env.REACT_APP_API}/admin/getcustomerOrders/${id}`
  );
}

export async function bookAppointment(doctorId, userId) {
  return axios.patch(`${process.env.REACT_APP_API}/doctor/bookAppointment/${doctorId}/${userId}`);
}

export async function getRemainingAppointments(doctorId) {
  return axios.get(`${process.env.REACT_APP_API}/doctor/getRemainingAppointments/${doctorId}`);
}

export async function getCompletedAppointments(doctorId) {
  return axios.get(`${process.env.REACT_APP_API}/doctor/getCompletedAppointments/${doctorId}`);
}

export async function updateAppointmentHistory(userId, doctorId) {
  return axios.patch(`${process.env.REACT_APP_API}/updateAppointmenthistory/${userId}/${doctorId}`);
}

export async function getDashboardData(id) {
  return axios.get(`${process.env.REACT_APP_API}/admin/getDashboardData`);
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
export const checkLoggedInAPI = "http://localhost:8000/checkLoggedIn";
