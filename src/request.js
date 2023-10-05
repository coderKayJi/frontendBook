import axios from "axios";
import { apiUrl } from "./settings";
import {
  fullBrowserVersion,
  browserName,
  osVersion,
  osName,
} from "react-device-detect";
let authAxios = axios.create({
  baseURL: apiUrl,
});

let authAxios1 = axios.create({
  baseURL: apiUrl,
});

authAxios1.interceptors.request.use(
  function (request) {
    request.responseType = "blob";
    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);

class Request {
  error = (err) => {
    try {
      if (err.response.status === 401) {
        localStorage.clear();
        window.location.href = "";
      }
    } catch (e) {}
  };

  // ------------------------------------------- API Start from here --------------------------------------------- //
  getBooks(data) {
    return new Promise((next, error) => {
      authAxios
        .get("/books", data)
        .then((d) => {
          next(d.data);
        })
        .catch((err) => {
          next({
            error: err.response.data.error,
            message: err.response.data.message,
          });
          this.error(err);
        });
    });
  }
  addBooks(data) {
    return new Promise((next, error) => {
      authAxios
        .post("/books", data)
        .then((d) => {
          next(d.data);
        })
        .catch((err) => {
          next({
            error: err.response.data.error,
            message: err.response.data.message,
          });
          this.error(err);
        });
    });
  }
  updateBooks(id, data) {
    return new Promise((next, error) => {
      authAxios
        .put(`/books/${id}`, { ...data })
        .then((d) => {
          next(d.data);
        })
        .catch((err) => {
          next({
            error: err.response.data.error,
            message: err.response.data.message,
          });
          this.error(err);
        });
    });
  }
}

export default new Request();
