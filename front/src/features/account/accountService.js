import axios from "axios";

const API_URL = "https://ebank-system.herokuapp.com/";

// const user = JSON.parse(localStorage.getItem("user"));
// console.log(user);
// console.log(user.user.role);

const accountApproval = async (slug, status, token) => {
  const config = {
    headers: {
      Token: token,
    },
  };
  const response = await axios.post(
    `${API_URL}users/accounts/${slug}/approve_account`,
    { accepted: status },
    config
  );

  if (response.data) {
    localStorage.setItem("accounts", JSON.stringify(response.data));
  }
  console.log(response.data);

  return response.data;
};

//get userAccount
const userAccount = async (slug, token) => {
  const config = {
    headers: {
      Token: token,
    },
  };
  const response = await axios.get(`${API_URL}users/accounts/${slug}`, config);

  //   if (response.data) {
  //     localStorage.setItem("user", JSON.stringify(response.data));
  //   }
  console.log(response.data);

  return response.data;
};

const updateUserAccount = async (slug, number, token) => {
  const config = {
    headers: {
      Token: token,
    },
  };
  const response = await axios.patch(
    `${API_URL}users/accounts/${slug}`,
    { balance: number },
    config
  );
  console.log(response.data);

  if (response.data) {
    localStorage.setItem("accounts", JSON.stringify(response.data));
  }
  return response.data;
};

const accountsList = async (token) => {
  const config = {
    headers: {
      Token: token,
    },
  };
  const response = await axios.get(API_URL + "users/accounts", config);
  console.log(response.data);

  return response.data;
};

// // user account

const accountService = {
  accountsList,
  userAccount,
  updateUserAccount,
  accountApproval,
};

export default accountService;
