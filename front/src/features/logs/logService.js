import axios from "axios";

const API_URL = "https://ebank-system.herokuapp.com/";
// const API_URL = "http://localhost:5000/";

const getLogs = async (token) => {
  const config = {
    headers: {
      Token: token,
    },
  };
  const response = await axios.get(API_URL + "all_logs", config);

  return response.data;
};

// get single log
const getUserLog = async (token) => {
  const config = {
    headers: {
      Token: token,
    },
  };
  const response = await axios.get(API_URL + "logs", config);

  return response.data;
};

const createLog = async (slug, logDetails, token) => {
  const config = {
    headers: {
      Token: token,
    },
  };
  const response = await axios.post(`${API_URL}logs`, logDetails, config);

  return response.data;
};

const logService = {
  getLogs,
  getUserLog,
  createLog,
};

export default logService;
