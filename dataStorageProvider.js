export default class DataStorageProvider {

  // overridden
  authorize() {}

  // overridden
  getAllFiles() {}

  // overridden
  getSharableLinkForFile() {}

  storeToken(value) {
    localStorage.setItem("GSP-"+this.constructor.name+"-token", value)
  }

  storeTokenExpiry(value) {
    localStorage.setItem("GSP-"+this.constructor.name+"-tokenExpiry", value)
  }

  isTokenValid() {
    if (this.getTokenExpiry() != null) {
      let expiry = this.getTokenExpiry();
      if (expiry === (null || undefined)) {
        return false;
      }
      if (Date.now() > expiry) {
        this.removeToken();
        this.removeTokenExpiry();
        return false;
      }
      return true;
    }
    return false;
  }

  removeToken() {
    if (localStorage.getItem("GSP-"+this.constructor.name+"-token") != null) {
      localStorage.removeItem("GSP-"+this.constructor.name+"-token");
    }
  }

  removeTokenExpiry() {
    if (localStorage.getItem("GSP-"+this.constructor.name+"-tokenExpiry") != null) {
      localStorage.removeItem("GSP-"+this.constructor.name+"-tokenExpiry");
    }
  }

  getToken() {
    return localStorage.getItem("GSP-"+this.constructor.name+"-token");
  }

  getTokenExpiry() {
    return localStorage.getItem("GSP-"+this.constructor.name+"-tokenExpiry");
  }
}