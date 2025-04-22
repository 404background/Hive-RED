#!/bin/bash

# Move to the script's directory
cd "$(dirname "$0")"

# Install Node-RED and Express
npm install node-red
npm install express

# Start Node-RED
node node-red.js &
