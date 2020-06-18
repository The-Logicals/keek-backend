import registrationMiddleware from './registration';
import loginMiddleware from './login';
import forgotPasswordMiddleware from './forgotPassword';
import resetPasswordMiddleware from './resetPassword';
import tokenValidator from './isLoggedIn';
import profile from './profile';

export default {
  registrationMiddleware,
  loginMiddleware,
  forgotPasswordMiddleware,
  resetPasswordMiddleware,
  tokenValidator,
  profile,
};
