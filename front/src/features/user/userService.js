import axios from "axios";

const API_URL = "https://ebank-system.herokuapp.com/";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "users", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

// get user
const getUser = async (slug, token) => {
  const config = {
    headers: {
      Token: token,
    },
  };
  const response = await axios.get(`${API_URL}users/${slug}`, config);

  console.log(response.data);

  return response.data;
};

//update user
const updateUser = async (userData, slug, token) => {
  const config = {
    headers: {
      Token: token,
    },
  };
  const response = await axios.patch(
    `${API_URL}users/${slug}`,
    userData,
    config
  );
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  console.log(response.data);

  if (response.data) {
    localStorage.setItem("accounts", JSON.stringify(response.data));
  }
  return response.data;
};

//get all users
const getUsers = async (token) => {
  const config = {
    headers: {
      Token: token,
    },
  };

  const response = await axios.get(API_URL + "users", config);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  console.log(response.data);
  return response.data;
};

//delete user

const deleteUser = async (slug, token) => {
  const config = {
    headers: {
      Token: token,
    },
  };

  const response = await axios.delete(
    `${API_URL}users/${slug}`,

    config
  );

  return response.data;
};

const approveUser = async (slug, status, token) => {
  const config = {
    headers: {
      Token: token,
    },
  };
  const response = await axios.post(
    `${API_URL}approve_user/${slug}`,
    { accepted: status },
    config
  );

  if (response.data) {
    localStorage.setItem("accounts", JSON.stringify(response.data));
  }
  console.log(response.data);

  return response.data;
};
const userService = {
  register,
  logout,
  login,
  getUser,
  updateUser,
  getUsers,
  deleteUser,
  approveUser,
};

export default userService;
