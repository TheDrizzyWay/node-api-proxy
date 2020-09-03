/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const amqp = require('amqplib');
const axios = require('axios');
require('dotenv').config();

const baseUrl = 'https://api.nasa.gov/insight_weather/?';

const receive = async () => {
  const params = new URLSearchParams({
    api_key: 'DEMO_KEY',
    feedtype: 'json',
    ver: '1.0'
  });

  try {
    const connection = await amqp.connect(process.env.RABBIT_MQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue('requests');

    channel.consume('requests', (request) => {
      console.log(request.content.toString());
      // call nasa api
      const { data } = axios.get(`${baseUrl}${params}`);
      console.log(data);
      channel.ack(request);
    });

    console.log('receiving requests...');
  } catch (error) {
    console.error(error);
  }
};

receive();
