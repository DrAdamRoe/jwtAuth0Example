import React from 'react';
import jwtDecode from 'jwt-decode';
import AuthService from './authService';

export default class AuthExample extends React.Component {

  componentWillMount() {
    this.setState({
      loggedIn: false,
      serverAuth: undefined,
    });
    this.authService = AuthService.create(() => {
      this.setState({ loggedIn: true });
      this.requestProtectedResource();
    });
    if (this.authService.loggedIn()) {
      this.setState({ loggedIn: true });
    }
    this.requestProtectedResource();
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

  render() {
    return (
      <div className="content">
        {!this.state.loggedIn &&
        <button className="action-button" onClick={() => this.authService.login()}>
          Login
        </button>
        }

        {this.state.loggedIn &&
        <div>
          <button className="action-button" onClick={() => this.logout()}>Logout</button>
          The payload of your Token is:<br />
          <pre>
          {JSON.stringify(jwtDecode(this.authService.getToken()), null, 4)}
          </pre>
        </div>
        }

        {this.state.serverAuth &&
        <div className="server-auth server-auth__success">
          Server accepted your token!
        </div>
        }

        {this.state.serverAuth === false &&
        <div className="server-auth server-auth__failure">
          Server rejected your token!
        </div>
        }
      </div>
    );
  }
}
