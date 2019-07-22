import reqwest from 'reqwest';

export const auth = {
  fetch(url, method, params, callback) {
    let api = this.getPath();
    this.setToken();
    let headers = this.getHeaders();
    reqwest({
      url: api + url,
      method: method,
      headers:headers,
      data: JSON.stringify(params),
      type: 'json',
      contentType: 'application/json',
      success: (result) => {
        if ("10110000" == result.resultCode) {
          callback(result.resultData);
        } else {
          console.log(result);
          callback("error");
        }
      },
      error: (err) => {
        console.log(err);
        callback("error");
        
      }
    });
  },

  getTimestamp(dateString) {
    return new Date(dateString).getTime()/1000;
  },
  getHeaders() {
    let headers = {
      "Accept": "*/*",
      "token": localStorage.token
    };
    return headers;
  },
  setToken() {
    localStorage.token = '1bbb33a681d64c87809927fb3ef2e5d6';
  },
  getPath(){
    // return '';
      // return 'http://127.0.0.1:8080';
      return 'http://127.0.0.1:8399';
  }

}
