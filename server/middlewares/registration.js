import Joi from '@hapi/joi';
import joiFormatter from '../helpers/joi-formatter';
import { authService } from '../services/authService';

const registrationValidation = async (req, res, next) => {
  const { body } = req;
  const { email } = body;

  const schema = Joi.object({
    fullName: Joi.string().required(),
    username: Joi.string().required(),
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
  if (user) {
    return res.status(409).json({
      status: false,
      error: 'Please enter a unique email.',
    });
  }

  return next();
};

export default registrationValidation;
