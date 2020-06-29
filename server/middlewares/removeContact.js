import { addressBookService } from '../services/addressBookService';

const removeUserContactValidation = async (req, res, next) => {
  const {
    params: { contactId },
    user: { id: userId },
  } = req;

  const userContact = await addressBookService.find({
    contactId,
    userId,
  });

  if (!userContact) {
    return res.status(409).json({
      status: false,
      error: 'Contact does not exist on your list',
    });
  }

  return next();
};

export default removeUserContactValidation;
