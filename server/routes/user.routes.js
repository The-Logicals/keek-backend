import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const {
  profile,
  addUserContactMiddleware,
  removeUserContactMiddleware,
  tokenValidator: { verifyToken },
} = middlewares;

const { userController, userContactController } = controllers;

const usersRoute = express.Router();

usersRoute.patch(
  '/users/me',
  [verifyToken, profile],
  userController.updateProfile
);

usersRoute.get('/users/:id', verifyToken, userController.getUserProfile);

usersRoute.post(
  '/user/contact/add/:contactId',
  [verifyToken, addUserContactMiddleware],
  userContactController.add
);

usersRoute.delete(
  '/user/contact/remove/:contactId',
  [verifyToken, removeUserContactMiddleware],
  userContactController.remove
);

usersRoute.get(
  '/user/contacts',
  [verifyToken],
  userContactController.getUsersContacts
);
export default usersRoute;
