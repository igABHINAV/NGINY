# NGINY Load Balancer

NGINY is a dynamic load balancer project designed to distribute incoming HTTP requests among multiple backend servers. This repository contains two main implementations: one without cache functionality and the other integrated with an LRU cache module.

## Load Balancer without Cache

The `load-balancer-without-cache.js` file implements a basic load balancer using a round-robin approach. Incoming requests are evenly distributed among a list of predefined servers without caching any responses. This setup is suitable for scenarios where caching is not necessary, focusing solely on load distribution.

### Run

To test the functionalities, execute the following command:

- `cd client` && `npm install`
- `npm run dev`
- Then similarly `cd ..` and `cd server` and run the server as `node index.js`
- Then open the main directory of NGINY
- Then execute `node <filename>` to test the functionalities.

  



