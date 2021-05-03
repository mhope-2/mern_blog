import HttpException from '../http/HttpException';

class InvalidCredentialsException extends HttpException {
  constructor() {
    super(401, 'Wrong credentials provided');
  }
}

export default InvalidCredentialsException;