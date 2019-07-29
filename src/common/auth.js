import reqwest from 'reqwest';

export const auth = {
  fetch(url, method, contentType, params, callback) {
    let api = this.getPath();
    this.setToken();
    let headers = this.getHeaders();
    reqwest({
      url: api + url,
      method: method,
      headers:headers,
      // data: JSON.stringify(params),
      data: params,
      type: 'json',
      contentType: contentType,
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
    localStorage.token = 'be39f126467c4d3da280bb6dfbb8c7bf';
  },
  getPath(){
    // return '';
      // return 'http://127.0.0.1:8080';
      return 'http://127.0.0.1:8399';
  }

}
