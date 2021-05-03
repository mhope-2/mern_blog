import * as bcrypt from 'bcrypt';
import * as express from 'express';
// const bcrypt = require('bcrypt')
import UserWithThatEmailAlreadyExistsException from '../exceptions/auth/UserWithThatEmailAlreadyExistsException';
import WrongCredentialsException from '../exceptions/auth/WrongCredentialsException'
import PasswordMismatchException from '../exceptions/auth/PasswordMismatchException'
import InvalidPasswordLengthException from '../exceptions/auth/InvalidPasswordLengthException'

import Controller from '../interfaces/controller.interface';
import validationMiddleware from '../middleware/validation.middleware';
import CreateUserDto from '../user/user.dto';
import UserModel from '../models/user.model';
import LogInDto from '../login/login.dto'
import TokenData from '../interfaces/tokenData.interface'
import UserInterface from '../interfaces/user.interface'
import DataStoredInToken from '../interfaces/dataStoredInToken.interface'
const jwt = require('jsonwebtoken')

class AuthenticationController implements Controller {

    public path = '/api/auth';
    public router = express.Router();
    private user = UserModel;

    constructor() {
        this.initializeRoutes();
      }
    
    private initializeRoutes() {

        this.router.get(`${this.path}/users`, this.userList);
        this.router.post(`${this.path}/register`, validationMiddleware(CreateUserDto), this.registration);
        this.router.post(`${this.path}/login`, validationMiddleware(LogInDto), this.loggingIn);
      }


    // get all users  
    private userList = async (req, res) => {
        await this.user.find()
          .then(users => res.json(users))
          .catch(err => res.status(400).json('Error: ' + err))
    } 

    // registration middleware
    private registration = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const userData: CreateUserDto = req.body;
        
        const passwordsMatch = await bcrypt.compare(req.body.password, req.body.password2)
        
        if (passwordsMatch) {
            res.json({"Response":`${req.body.password} registered successfully`});
          } 
        else if(userData.password.length < 6){
            next(new InvalidPasswordLengthException())
        }
        else {
          if (
            await this.user.findOne({ email: userData.email })
          ) {
            next(new UserWithThatEmailAlreadyExistsException(userData.email));
          } else {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const user = await this.user.create({
              ...userData,
              password: hashedPassword,
            });
            user.password = '';
            const tokenData = this.createToken(user);
            res.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
            res.json({"Response":`User with username ${user.username} created successfully`});
        }
      }
      }


      // login middleware
      private loggingIn = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const logInData: LogInDto = req.body;
        const user = await this.user.findOne({ username: logInData.username });
        if (user) {
          const isPasswordMatching = await bcrypt.compare(logInData.password, user.password)
          if (isPasswordMatching) {
            user.password = '';
            res.json({"Response":"User authenticated successfully"});
          } else {
            next(new WrongCredentialsException())
          }
        } else {
          next(new WrongCredentialsException());
        }
      }

      private createCookie(tokenData: TokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
      }

      get getCookie(){
        return this.createCookie
      }

    // create token
      private createToken(user): TokenData {
        const expiresIn = 15 * 60
        const secret = process.env.JWT_SECRET;
        const dataStoredInToken: DataStoredInToken = {
          _id: user._id
        };
        return {
          expiresIn,
          token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
        };
      }
    
    

}    

export default AuthenticationController