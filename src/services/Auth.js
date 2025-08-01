import axios from "axios";

const backend_url = import.meta.env.VITE_BACKEND_URL + "/api/v1";

export const api = axios.create({
  baseURL: backend_url,
});

api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null;
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export const login = async (email, password) => {
  try {
    const response = await api.post("/login", {
      email,
      password,
    });

    // console.log(response.data)
    return response.data;
  } catch (error) {
    console.log("Error Message: ", error.message);
    console.log("Error Status: ", error.response.status);
    console.log("Error Data: ", error.response.data);
    return error.response.data;
  }
};

export const signup = async (
  firstName,
  lastName,
  email,
  password,
  confirmPassword
) => {
  try {
    const response = await api.post("/signup", {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });

    // console.log('Signin response: ', response.data)
    return response.data;
  } catch (error) {
    console.log("Error Message: ", error.message);
    console.log("Error Status: ", error.response.status);
    console.log("Error Data: ", error.response.data);
    return error.response.data;
  }
};
