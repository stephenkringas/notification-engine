import dotenv from 'dotenv';
import { notificationConsumer } from './services/kafka/notification.js';

dotenv.config();

// Create Notification Consumer connecting to Confluent Cloud Topic - odw_outage_table
notificationConsumer()
  .catch((err) => {
    console.error(`Something went wrong:\n${err}`);
    process.exit(1);
  });

