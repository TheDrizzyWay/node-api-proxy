/* eslint-disable linebreak-style */
const amqp = require('amqplib');
require('dotenv').config();

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
