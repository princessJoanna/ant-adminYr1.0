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
  setToken(token) {
    window.localStorage.setItem("TOKEN", token)
  }
  getToken() {
    return window.localStorage.getItem("TOKEN")
  }
  removeToken() {
    window.localStorage.removeItem("TOKEN")
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
