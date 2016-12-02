# jado-pado-signup

This demonstrate how a user is signed up and logged into an app with a password and two factor authentication.

## Running in dev mode

The app has two components. The client and the server.

The client is a react web app built using [create react app](https://github.com/facebookincubator/create-react-app)

The server is a express server. It communicates with the client through JSON.

After cloning the repo,


~~~
cd jado-pado-signup
# Edit the `config.js` file the appropriate configurations.
npm start # Starts the server
cd client
npm start # Starts the client development server
~~~

And then visit http://localhost:3000

## Configurations

* Mongo db url
* Authy API key
