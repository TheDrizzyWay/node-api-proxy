/* eslint-disable linebreak-style */
const amqp = require('amqplib');
require('dotenv').config();

const receive = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBIT_MQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue('requests');

    channel.consume('requests', (request) => {
      console.log(request.content.toString());
      channel.ack(request);
    });

    console.log('receiving requests...');
  } catch (error) {
    console.error(error);
  }
};

receive();
