const axios = require('axios');
const async = require('async');


const url = 'https://dog.ceo/api/breeds/image/random'; // URL to test
const numRequests = 10; // Number of requests to send
const durationInSeconds = 5; // Duration in seconds to send requests


// Function to send HTTP requests and measure latency
async function sendRequest(url) {
    const startTime = Date.now();
    try {
        const response = await axios.get(url);
        console.log(response.data);
        const endTime = Date.now();
        const latency = endTime - startTime;
        console.log(`Request to ${url} succeeded with status ${response.status}. Latency: ${latency} ms`);
        return { latency, success: true };
    } catch (error) {
        const endTime = Date.now();
        const latency = endTime - startTime;
        console.error(`Request to ${url} failed with error: ${error.message}. Latency: ${latency} ms`);
        return { latency, success: false };
    }
}

// Function to perform load testing and collect latency metrics
async function loadTest(url, numRequests, durationInSeconds) {
    const startTime = Date.now(); // Start time of load test
    const concurrency = Math.ceil(numRequests / (durationInSeconds * 1000 / 100)); // Adjust concurrency for desired time frame
    console.log(`Concurrency level: ${concurrency}`);

    const tasks = Array(numRequests).fill(url);
    const latencies = [];

    await async.eachLimit(tasks, concurrency, async (taskUrl) => {
        const { latency, success } = await sendRequest(taskUrl);
        if (success) {
            latencies.push(latency);
        }
    });

    const endTime = Date.now(); // End time of load test
    const loadTestDuration = endTime - startTime; // Calculate load test duration
    console.log(`Load test completed in ${loadTestDuration} ms. Sent ${numRequests} requests.`);
    return latencies;
}



loadTest(url, numRequests, durationInSeconds)
    .then((latencies) => {
        console.log('All requests completed.');
        console.log('Latency statistics:');
        console.log(`Min: ${Math.min(...latencies)} ms`);
        console.log(`Max: ${Math.max(...latencies)} ms`);
        console.log(`Average: ${latencies.reduce((acc, curr) => acc + curr, 0) / latencies.length} ms`);
    })
    .catch(error => console.error('Load test failed:', error));
