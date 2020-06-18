import Joi from '@hapi/joi';
import joiFormatter from '../helpers/joi-formatter';

const resetPasswordValidation = async (req, res, next) => {
  const { body } = req;
  const schema = Joi.object({
    resetToken: Joi.string().required(),
    newPassword: Joi.string()
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

  return next();
};

export default resetPasswordValidation;
