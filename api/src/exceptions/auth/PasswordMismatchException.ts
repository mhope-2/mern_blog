import HttpException from '../http/HttpException';

class PasswordMismatchException extends HttpException {
  constructor() {
    super(401, 'Provided Password Does Not Satisfy Requirements');
  }
}

export default PasswordMismatchException;