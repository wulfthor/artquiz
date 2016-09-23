var buffer = require('buffer');

class AuthService {
  login(creds, cb) {

    var b = new buffer.Buffer(creds.username + ":" + creds.password);
    var encodedAuth = b.toString('base64');
    console.log("E: " + encodedAuth);
    fetch('https://api.github.com/user', {
      headers: {
        'Authorization' : 'Basic ' + encodedAuth
      }
    })
    .then((response)=> {
      console.log("first prom");
      if(response.status >= 200 && response.status < 300) {
        return response;
      }
      throw {
        badCredentials: response.status == 401,
        unknownError: response.status != 401
      }
    })
    .then((response)=> {
      //console.log(response);
      return response.json();
    })
    .then((results)=> {
      //console.log(results);
      return cb({success:true});
    })
    .catch((err)=> {
      console.log('logon failed: ' + err);
      return cb(err);
    })
    .finally(()=> {
      return cb({showProgress: false});
    });

  }
}

module.exports = new AuthService();
