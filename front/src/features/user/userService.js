import axios from "axios";

const API_URL = "https://ebank-system.herokuapp.com/";
// const API_URL = "http://localhost:5000/";

// get user
const getUser = async (slug, token) => {
  const config = {
    headers: {
      Token: token,
    },
  };
  const response = await axios.get(`${API_URL}users/${slug}`, config);

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
    localStorage.setItem("users", JSON.stringify(response.data));
  }

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
    localStorage.setItem("accounts", JSON.stringify(response.data));
  }
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

const approveUser = async (slug, { accepted, status }, token) => {
  const config = {
    headers: {
      Token: token,
    },
  };
  const response = await axios.post(
    `${API_URL}approve_user/${slug}`,
    { accepted, status },
    config
  );

  if (response.data) {
    localStorage.setItem("accounts", JSON.stringify(response.data));
  }

  return response.data;
};

const userService = {
  getUser,
  updateUser,
  getUsers,
  deleteUser,
  approveUser,
};

export default userService;
