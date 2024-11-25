import app from './app';
import { config } from './config/config';
import { fetchDataInBatches } from './services/fetchDataService';

const PORT = config.serverPort;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Starting background data fetching...');
  fetchDataInBatches();
});
