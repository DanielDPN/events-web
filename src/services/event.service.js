import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/events/";

const getAll = () => {
  return axios.get(API_URL);
};

const get = id => {
  return axios.get(API_URL + id);
};

const create = data => {
  return axios.post(API_URL, data, { headers: authHeader() });
};

const update = (id, data) => {
  return axios.put(API_URL + id, data, { headers: authHeader() });
};

const remove = id => {
  return axios.delete(API_URL + id, { headers: authHeader() });
};

const removeAll = () => {
  return axios.delete(API_URL);
};

const findByName = name => {
  return axios.get(API_URL + `?name=${name}`, { headers: authHeader() });
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName
};
