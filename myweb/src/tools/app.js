import cookie from "cookiejs"

const adminToken = "admin_token"

export function getToken() {
  return cookie.get(adminToken);
}

export function removeToken() {
  return cookie.remove(adminToken);
}

export function setToken(token) {
  cookie.set(adminToken,token, {expires: 3, path: '/' });
}
