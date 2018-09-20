import React from 'react';
import jwtDecode from 'jwt-decode';
import AuthService from './authService';

export default class AuthExample extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      serverAuth: false,
    };

    this.authService = AuthService.create(() => {
      this.state = { loggedIn: true, };
    });

    this.requestProtectedResource = this.requestProtectedResource.bind(this);
    this.DisplayText = this.DisplayText.bind(this);

  }


  logout() {
    this.authService.logout();
    this.requestProtectedResource();
    this.setState({ loggedIn: false });
  }

  requestProtectedResource() {
    fetch('/secretApi', {
      headers: {
        'Authorization': 'bearer ' + this.authService.getToken()
      }
    })
      .then(response => {
        if (response.status === 401) {
          this.setState({serverAuth: false});
        } else {
          this.setState({serverAuth: true});
        }
      })
  }

  DisplayText(){
    if (this.state.serverAuth && this.state.loggedIn ){
      return <div className="server-auth server-auth__success"> Server accepted your token! </div>
    }
    else if (!this.state.serverAuth  && this.state.loggedIn){
      return <div className="server-auth server-auth__failure"> Server rejected your token! </div>
    }else{
      return <div className="server-auth"> login, then check validity. </div>
    }
  }

  render() {
    return (
      <div className="content">
        {!this.state.loggedIn &&
        <button className="action-button" onClick={() => this.authService.login()}>
          Login via Auth0
        </button>
        }

        <button className="action-button" onClick={() => this.requestProtectedResource()}>
          Check Token validity against local server
        </button>
        

        {this.state.loggedIn &&
        <div>
          <button className="action-button" onClick={() => this.logout()}>Logout</button>
          The payload of your Token is:<br />
          <pre>
          {JSON.stringify(jwtDecode(this.authService.getToken()), null, 4)}
          </pre>
        </div>
        }    
        
      < this.DisplayText />

      </div>
    );
  }
}
