import Auth0Lock from 'auth0-lock';
import jwtDecode from 'jwt-decode';

const tokenIsExpired = (token) => {
  try {
    // we do not check the signature here because we do not want our SECRET on the client side
    const decodedToken = jwtDecode(token);
    return new Date(0).setUTCSeconds(decodedToken.exp) < new Date();
  } catch (e) {
    console.error(e);
    return true;
  }
};

const Prototype = {
  login() {
    // show auth0 popup
    this.lock.show();
  },
  loggedIn() {
    const token = this.getToken();
    console.log("getting token")
    console.log(token)
    // if (token) {
    //   if (!tokenIsExpired(token)) {
    //     return true;
    //   }

    //   this.logout();
    // }

    // return false;
    return true;
  },
  
  logout() {
    localStorage.removeItem('accessToken');
  },

  getToken() {
    return localStorage.getItem('accessToken');
  },
  
};

export default {
  create(onLoggedIn) {
    const obj = Object.create(Prototype);

    var options = {
      auth: {
        redirectUrl: 'http://localhost:8080',
        responseType: 'token',
        autoclose: true,
        closable: true,
        avatar: null,
        rememberLastLogin: false,       
      },
    };

    obj.lock = new Auth0Lock(process.env.CLIENT_ID, process.env.APP_DOMAIN, options);

    // Add callback for lock `authenticated` event
    obj.lock.on('authenticated', (authResult) => {
      obj.lock.getUserInfo(authResult.accessToken, function(error, profile) {
        if (error) {
          console.log("error in lock")
          return;
        }
    
        localStorage.setItem("accessToken", authResult.accessToken);
        localStorage.setItem("profile", JSON.stringify(profile));
        console.log(authResult.accessToken)

        onLoggedIn(obj);
      });
    });  
    return obj;    
  }
};
