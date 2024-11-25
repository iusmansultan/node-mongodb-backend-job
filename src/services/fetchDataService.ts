import axios from 'axios';
import { config } from '../config/config';
import { User } from '../models/User';

export async function fetchDataInBatches() {
  const totalRequests = Math.ceil(config.totalResults / config.requestsPerBatch);
  const requestsPerSecond = config.requestsPerSecond;
  const resultsPerRequest = config.requestsPerBatch / requestsPerSecond;

  let requestCount = 0; // Track the number of requests

  for (let batch = 0; batch < totalRequests; batch++) {
    console.log(`Starting batch ${batch + 1}...`);

    for (let i = 0; i < resultsPerRequest; i++) {
      // Send multiple requests in parallel (up to `requestsPerSecond`)
      await Promise.all(
        Array.from({ length: requestsPerSecond }).map(async () => {
          try {
            const response = await axios.get(config.apiBaseUrl, {
              params: { results: 1 }, // Adjust this if API allows fetching more results per request
            });
            const users = response.data.results.map(formatUserData);

            // Save data to the database
            await User.insertMany(users, { ordered: false }).catch(() => { });
          } catch (error: any) {
            console.error('Error fetching data:', error.message);
          }

          // Increment request count and handle sleep after 5 requests
          requestCount++;
          if (requestCount % 5 === 0) {
            console.log(`Sleeping for ${config.batchSleep / 1000} seconds...`);
            await new Promise((resolve) =>
              setTimeout(resolve, config.batchSleep)
            ); // Sleep for 30 seconds
          }
        })
      );

      // Ensure a 1-second delay between sets of requests
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    console.log(`Completed batch ${batch + 1}`);
  }

  console.log('Data fetching complete.');
}

function formatUserData(user: any) {
  return {
    id: user.login.uuid,
    gender: user.gender,
    name: `${user.name.first} ${user.name.last}`,
    email: user.email,
    age: user.dob.age,
    picture: user.picture.large,
    address: {
      city: user.location.city,
      state: user.location.state,
      country: user.location.country,
      street: `${user.location.street.number} ${user.location.street.name}`,
    },
  };
}
