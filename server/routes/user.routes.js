import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const {
  profile,
  tokenValidator: { verifyToken },
} = middlewares;

const { userController } = controllers;

const usersRoute = express.Router();

usersRoute.patch(
  '/users/me',
  [verifyToken, profile],
  userController.updateProfile
);

usersRoute.get('/users/:id', verifyToken, userController.getUserProfile);

export default usersRoute;
