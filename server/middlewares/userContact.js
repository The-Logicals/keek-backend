import { contactService } from '../services/contactService';
import { addressBookService } from '../services/addressBookService';

const addUserContactValidation = async (req, res, next) => {
  const {
    params: { contactId },
    user: { id: userId },
  } = req;
  const contact = await contactService.find({ id: contactId });

  if (!contact) {
    return res.status(404).json({
      status: false,
      error: 'Contact does not exist on the platform yet.',
    });
  }

  const userContact = await addressBookService.find({
    contactId,
    userId,
  });

  if (userContact) {
    return res.status(409).json({
      status: false,
      error: 'You already have this user on your contact list',
    });
  }

  req.contact = contact;
  return next();
};

export default addUserContactValidation;
