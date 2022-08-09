import axios from "axios";
import { backend } from "..";
const baseUrl = `${backend}/api/blogs`;

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export { login };
