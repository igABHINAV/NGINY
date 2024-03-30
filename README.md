# NGINY Load Balancer

NGINY is a dynamic load balancer project designed to distribute incoming HTTP requests among multiple backend servers. This repository contains two main implementations: one without cache functionality and the other integrated with an LRU cache module.

## Load Balancer without Cache

The `load-balancer-without-cache.js` file implements a basic load balancer using a round-robin approach. Incoming requests are evenly distributed among a list of predefined servers without caching any responses. This setup is suitable for scenarios where caching is not necessary, focusing solely on load distribution.

### Run

To test the functionalities, execute the following command:

- `cd NGINY`
- `npm install`
- Then write  your backend server URL in `servers = []` by removing the existing URLs .
- `node <filename>`
- NOTE : The client and server folders are only for demonstration .

  



