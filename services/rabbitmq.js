const amqp = require('amqplib/callback_api');

const sendMessage = (queue, msg) => {
  amqp.connect(process.env.RABBITMQ_URL, (err, conn) => {
    if (err) throw err;
    conn.createChannel((err, ch) => {
      if (err) throw err;
      ch.assertQueue(queue, { durable: false });
      ch.sendToQueue(queue, Buffer.from(msg));
      console.log(`Mensagem enviada: ${msg}`);
    });
  });
};

module.exports = sendMessage;
