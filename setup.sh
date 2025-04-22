#!/bin/bash

# Move to the script's directory
cd "$(dirname "$0")"

# Ensure Node.js and npm are installed
if ! command -v node &> /dev/null || ! command -v npm &> /dev/null; then
    echo "Node.js and npm are not installed. Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        echo "Node.js version is less than 18. Updating Node.js..."
        curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
        sudo apt-get install -y nodejs
    fi
fi

# Install Node-RED and Express
npm install node-red
npm install express

# Start Node-RED
node node-red.js &
