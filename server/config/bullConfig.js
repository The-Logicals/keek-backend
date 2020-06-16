import Queue from 'bull';
import Env from '../../Env';

const REDIS_URL = Env.get('REDIS_URL');

// Initiating the Queue with a redis instance
const sendMailQueue = new Queue('sendMail', REDIS_URL);

export default sendMailQueue;
