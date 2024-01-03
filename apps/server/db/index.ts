import mongoose, { ConnectOptions } from 'mongoose';
import { CLUSTER_URL, DB_NAME, DB_PASSWORD, DB_USERNAME } from '../config';
import { logger } from '../utils/logger';

if (!DB_USERNAME || !DB_PASSWORD || !CLUSTER_URL || !DB_NAME) {
  throw new Error(`Missing environment variables for MongoDB connection`);
}

// const MONGODB_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${CLUSTER_URL}/${DB_NAME}?retryWrites=true&w=majority`;

const MONGODB_URI = `mongodb://localhost:27017/${DB_NAME}`;

async function connectToDB() {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions;

  try {
    await mongoose.connect(MONGODB_URI, options);
    logger.info('⚡️[DB]: Connected successfully!');
  } catch (error) {
    logger.error(`❌[DB]: Could not connect. Here is the error: ${error as string}`);
    process.exit();
  }
}

export default connectToDB;
