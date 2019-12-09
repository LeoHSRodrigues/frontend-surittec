import { authenticationService } from "../_services/authenticationService";

export function authHeader() {
  // return authorization header with jwt token
  const currentUser = authenticationService.currentUserValue;
  if (currentUser) {
    return currentUser;
  } else {
    return {};
  }
}

export function handleResponse() {
  return null;
}
