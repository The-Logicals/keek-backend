import Joi from '@hapi/joi';
import joiFormatter from '../helpers/joi-formatter';
import { authService } from '../services/authService';

const updateProfileValidation = async (req, res, next) => {
  const { body } = req;
  const { username } = body;
  const schema = Joi.object({
    bio: Joi.string(),
    username: Joi.string(),
    avatar: Joi.string(),
  });

  const { error } = schema.validate(body);

  if (error) {
    const { message } = error.details[0];
    const formattedMessage = joiFormatter(message);
    return res.status(400).send({
      status: false,
      error: formattedMessage,
    });
  }

  if (username) {
    const user = await authService.find({ username });

    if (user) {
      return res.status(409).json({
        status: false,
        error: 'This username already exists!',
      });
    }
  }

  return next();
};

export default updateProfileValidation;
