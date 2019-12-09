import { BehaviorSubject } from "rxjs";
import axios from "axios";
import jwt_decode from "jwt-decode";

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);

export const authenticationService = {
  login,
  logout,
  tokenValido,
  verificaAdmin,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  }
};

function login(login) {
  return axios({
    method: "post",
    url: `http://localhost:8080/login`,
    data: login
  });
}

function tokenValido() {
  if (currentUserSubject.value) {
    const token = currentUserSubject.value;
    const decodedToken = jwt_decode(token.substring(7));
    // console.log(decodedToken.exp);
    const dateNow = new Date();
    // console.log(dateNow);
    // if(decodedToken.exp < dateNow.getTime()){
    //     this.logout();
    // }
    return true;
  }
  this.logout();
}

function verificaAdmin() {
  if (currentUserSubject.value) {
    const token = currentUserSubject.value;
    const decodedToken = jwt_decode(token.substring(7));
    if (decodedToken.aud === "Administrador") {
      return true;
    }
  }
  return false;
}

function logout() {
  localStorage.removeItem("currentUser");
  currentUserSubject.next(null);
  window.location.href = "/login";
}
