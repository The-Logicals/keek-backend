import express from 'express';

// auth Routes
import authRoute from './auth.routes';

// user Routes
import userRoute from './user.routes';

// express router
const router = express.Router();

router.use('/auth', authRoute);
router.use(userRoute);

export default router;
