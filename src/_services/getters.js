import { authHeader, handleResponse } from "../_helpers/authConfig";
import axios from "axios";

export function getAll() {
  return axios
    .get("http://localhost:8080/api/clientes", {
      headers: { Authorization: authHeader() }
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
}

export function getCEP(cep) {
  return axios
    .get("http://viacep.com.br/ws/" + cep + "/json/")
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
}

export function salvarCliente(formulario) {
  return axios({
    method: "post",
    url: `http://localhost:8080/api/clientes`,
    data: formulario,
    headers: { Authorization: authHeader() }
  });
}

export function getById(id) {}
