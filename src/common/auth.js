import reqwest from 'reqwest';

export const auth = {
  fetch(url, method, params, callback) {
    let api = this.getPath();
    reqwest({
      url: api + url,
      method: method,
      data: params,
      type: 'json',
      success: (result) => {
        // console.log("---------------------");
        // console.log(result);
        callback(result);
      },
      error: (err) => {
        console.log("+++++++++++++++++++++");
        console.log(err);
        if (401 == err.status) {
           window.location.href= this.getLoginUrl();
        }
        // console.log(err);
        // callback(err.status);
        callback("error");
        // if (err.status == 767) {
        //   callback(err.status);
        // } else if(err.status == 400) {
        //   callback(err.status);
        // } else if (err.status == 401) {
        //   window.location.href= this.getLoginUrl();
        // } else if (err.status == 403) {
        //   callback(err.status);
        // } else if (err.status == 405) {
        //   callback(err.status);
        // } else if (err.status == 452) {
        //   callback(err.status);
        // } else {
        //   console.log(err);
        //   callback(err);
        // }
       
      }
    });
  },

  getTimestamp(dateString) {
    return new Date(dateString).getTime()/1000;
  },


  getPath(){
    return '';
      // return 'http://localhost:8080';
  }

}
