import axios from "axios";
const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/api/users`;

const create = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response;
};

export default { create };
