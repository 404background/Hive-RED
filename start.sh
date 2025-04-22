#!/bin/bash

# Move to the script's directory
cd "$(dirname "$0")"

# Ensure Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is required but not installed. Please install it first."
    exit 1
fi

# Start Node-RED
node node-red.js &
