import dotenv from 'dotenv';

dotenv.config();

export const config = {
  apiBaseUrl: process.env.API_BASE_URL || 'https://randomuser.me/api/',
  dbUri: process.env.DB_URI || 'mongodb://localhost:27017/randomUsers',
  requestsPerSecond: Number(process.env.REQUESTS_PER_SECOND) || 5,
  requestsPerBatch: Number(process.env.REQUESTS_PER_BATCH) || 300,
  batchSleep: Number(process.env.BATCH_SLEEP) || 30000,
  totalResults: Number(process.env.TOTAL_RESULTS) || 5000,
  serverPort: process.env.PORT || 3001,
};
