import registrationMiddleware from './registration';
import loginMiddleware from './login';
import forgotPasswordMiddleware from './forgotPassword';
import resetPasswordMiddleware from './resetPassword';
import tokenValidator from './isLoggedIn';
import profile from './profile';
import addUserContactMiddleware from './userContact';
import removeUserContactMiddleware from './removeContact';

export default {
  registrationMiddleware,
  loginMiddleware,
  forgotPasswordMiddleware,
  resetPasswordMiddleware,
  tokenValidator,
  profile,
  addUserContactMiddleware,
  removeUserContactMiddleware,
};
