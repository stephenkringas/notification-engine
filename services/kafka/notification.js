// Create Kafka Outage Notification Consumer
import Kafka from 'node-rdkafka';
import { getCustomerPreferences } from '../cdc/cdc.js';
import { sendNotification } from '../pinpoint/pinpoint.js';


function createNotificationConsumer(onData) {

  const consumer = new Kafka.KafkaConsumer({
    'bootstrap.servers': process.env.bootstrap_servers,
    'sasl.username': process.env.sasl_username,
    'sasl.password': process.env.sasl_password,
    'security.protocol': process.env.security_protocol,
    'sasl.mechanisms': process.env.sasl_mechanisms,
    'group.id': 'node-notification-consumer'
  }, {
    'auto.offset.reset': 'earliest'
  });

  return new Promise((resolve, reject) => {
    consumer
      .on('ready', () => resolve(consumer))
      .on('data', onData)
      .on('connection.failure', () => console.log('conneciton error'));

    consumer.connect();
  });
}


async function notificationConsumer() {

  console.log(`Consuming records from ${process.env.topic}`);

  const consumer = await createNotificationConsumer(({key, value, partition, offset}) => {

    // Get the Impacted Customer from NMI and their preferences
    const preferences =  getCustomerPreferences(value.NMI);
    const notifPromise = sendNotification();

    switch (value.Type) {
      case 'Unplanned':
        
        break;
      case 'Planned':

        break;  
    }

    // console.log(`Consumed record with key ${key} and value ${value} of partition ${partition} @ offset ${offset}.`);
  });

  consumer.subscribe([process.env.topic]);
  consumer.consume();

  process.on('SIGINT', () => {
    console.log('\nDisconnecting consumer ...');
    consumer.disconnect();
  });
}

  // function sendNotification() {

  // }
export { notificationConsumer};