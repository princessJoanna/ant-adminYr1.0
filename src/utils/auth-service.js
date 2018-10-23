import decode from "jwt-decode"
import axios from "axios"

export default class AuthService {
  loggedIn() {
    const token = this.getToken()
    return token
  }
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp > Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }
  setToken(type,token) {
    window.localStorage.setItem(type, token)
  }
  getToken(type) {
    return window.localStorage.getItem(type)
  }
  removeToken(type) {
    window.localStorage.removeItem(type)
  }
  // logout() {
  //   axios.post("/api/login/outlogin").then(data => {
  //     if (data && data.success) {
  //       this.removeToken()
  //     }
  //   })
  // }
  getProfile() {
    return decode(this.getToken())
  }
}
