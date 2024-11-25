import { fetchDataInBatches } from '../services/fetchDataService';

export async function startQueue() {
  try {
    await fetchDataInBatches();
  } catch (error) {
    console.error('Error in queue processing:', error);
  }
}
