import Joi from '@hapi/joi';
import joiFormatter from '../helpers/joi-formatter';
import { authService } from '../services/authService';

const loginValidation = async (req, res, next) => {
  const { body } = req;
  const { email } = body;
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string()
      .required()
      .pattern(/^[a-zA-Z0-9]{8,30}$/),
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

  const user = await authService.find({ email });

  if (!user) {
    return res.status(400).send({
      status: false,
      error: 'User does not exist',
    });
  }

  if (!user.isVerified) {
    return res.status(400).send({
      status: false,
      error: 'Hi you need to verify your account.',
    });
  }

  req.user = user;
  return next();
};

export default loginValidation;
