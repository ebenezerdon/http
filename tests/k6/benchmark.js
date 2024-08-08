import http from 'k6/http';
import { check } from 'k6';
import { Counter } from 'k6/metrics';

// A simple counter for http requests
export const requests = new Counter('http_reqs');

export const options = {
    scenarios: {
      contacts: {
        executor: 'ramping-arrival-rate',
        preAllocatedVUs: 1000,
        timeUnit: '30s',
        startRate: 1000000,
        stages: [
          { target: 1000000, duration: '10m' },
        ],
      },
    },
};

// Example list of keys to iterate over
// const keys = ['key1', 'key2', 'key3']; // Add your actual keys here
const keys = ['key1']; // Add your actual keys here

export default function () {
    // Iterate over each key for the request
    keys.forEach(key => {
        const config = {
            headers: {
                'X-Utopia-Key': key,
            }
        };

        const resDb = http.get('http://localhost:9401', config);

        if(resDb.status !== 200) {
            console.log(`Error: ${resDb.status}`);
        }

        check(resDb, {
            'status is 200': (r) => r.status === 200,
            // Check if the echoed key in response is the same as the sent key
            // 'response contains the same X-Utopia-Key value': (r) => {
            //     // Assuming the response is JSON and has a key that echoes the header value
            //     return r.body === key;
            // },
        });
    });
}
