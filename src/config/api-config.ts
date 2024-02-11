import axios from "axios";

const baseApi = axios.create({
  baseURL: `${import.meta.env.BASE_URL}/todos.json`,
});

export default baseApi;
