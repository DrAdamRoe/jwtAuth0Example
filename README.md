# Example Application for authentication with Auth0 and JWT
Start with a free account with a client on [Auth0](https://auth0.com). 
Create an application here, and add a user. 

Locally, you will have to create a `.env` file. It should contain three entires from your Auth0 application:

```
SERVER_SECRET=MY_SECRET
CLIENT_ID=MY_CLIENT_ID
APP_DOMAIN=MY_APP_DOMAIN
```

The Express server will get the environment variables directly from the process via `dotenv`, while webpack will replace placeholders for the domain and id on build. 

Install: **npm install**

Run **npm start** and hit [localhost:8080](http://localhost:8080).
