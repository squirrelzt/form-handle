import reqwest from 'reqwest';
import { message } from 'antd';

export const auth = {
  fetch(url, method, contentType, params, callback) {
    let api = this.getPath();
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
        if (401 == err.status) {
          let response = eval('(' + err.response + ')');
          message.error(response.message);
          // window.location.href = 'http://sso.uc.test.66yunlian.com?source=https://cangadmintest.66yunlian.cn/dapingadmin/';
            //  window.location.href = 'http://sso.uc.test.66yunlian.com?source=http://127.0.0.1:3000/configtemplate';
            // window.location.href = 'http://sso.uc.test.66yunlian.com?source=https://cangadmintest.66yunlian.cn/dapingadmin/';
            // window.location.href = 'http://cangtest.66yunlian.cn?source=http://127.0.0.1:3000/configtemplate';
        }
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
    localStorage.token = '69c65a536b464a92bd9980ebc1a724e5';
  },
  getPath(){
    return '';
      // return 'http://127.0.0.1:8080';
      // return 'http://127.0.0.1:8399';
  }

}
