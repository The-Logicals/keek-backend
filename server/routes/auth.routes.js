import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const {
  registrationMiddleware,
  loginMiddleware,
  forgotPasswordMiddleware,
  resetPasswordMiddleware,
} = middlewares;
const { authController } = controllers;

const authRoute = express.Router();

authRoute.post('/register', registrationMiddleware, authController.register);
authRoute.get('/verification', authController.verifyEmail);
authRoute.post('/login', loginMiddleware, authController.login);

authRoute.post(
  '/forgot-password',
  forgotPasswordMiddleware,
  authController.forgotPassword
);

authRoute.post(
  '/reset-password',
  resetPasswordMiddleware,
  authController.resetPassword
);

export default authRoute;
