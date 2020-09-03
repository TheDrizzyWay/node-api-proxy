/* eslint-disable linebreak-style */
const amqp = require('amqplib');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

const connect = async (req, res) => {
  try {
    const connection = await amqp.connect(process.env.RABBIT_MQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue('requests');

    channel.sendToQueue('requests', Buffer.from('weather on mars'));
    return res.status(200).json({ msg: 'sent' });
  } catch (error) {
    console.error(error);
  }
  return true;
};

module.exports = connect;
