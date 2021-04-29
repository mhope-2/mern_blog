import *  as dotenv from 'dotenv'
import validateEnv from './utils/validateEnv'
import AuthenticationController from './controllers/authentication.controller'
import App from './app'

// get env variables
dotenv.config({
  path:'./src/config/.env'
});

// validate env variables
validateEnv();

// instantiate app class
const app = new App(
  [
    new AuthenticationController()
  ],
);

app.listen();
