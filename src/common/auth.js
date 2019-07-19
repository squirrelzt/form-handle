import reqwest from 'reqwest';

export const auth = {
  fetch(url, method, params, callback) {
    let api = this.getPath();
    let headers = this.getHeaders();
    this.setToken();
    let param;
    if (params) {
      params.token = localStorage.token;
      param = params;
    } else {
      param = {
        'token': localStorage.token
      }
    }
    reqwest({
      url: api + url,
      method: method,
      // headers:headers,
      data: param,
      type: 'json',
      success: (result) => {
        // console.log("---------------------");
        // console.log(result);
        callback(result);
      },
      error: (err) => {
        // console.log("+++++++++++++++++++++");
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
      "token": localStorage.token
    };
    return headers;
  },
  setToken() {
    localStorage.token = 'dec2bb6c752342178176082e1b43ab43';
  },
  getPath(){
    // return '';
      // return 'http://localhost:8080';
      return 'http://localhost:8399';
  }

}
