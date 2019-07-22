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
      headers: {
        "Accept": "*/*",
        "token": localStorage.token
      },
      data: param,
      type: 'json',
      success: (result) => {
        // console.log("---------------------");
        // console.log(result);
        if ("10110000" == result.resultCode) {
          callback(result.resultData);
        } else {
          
        }
        // callback(result);
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
    localStorage.token = '8526b872870b49a5929d0761d5fb02d9';
  },
  getPath(){
    // return '';
      // return 'http://localhost:8080';
      return 'http://localhost:8399';
  }

}
