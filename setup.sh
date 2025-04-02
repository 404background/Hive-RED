#!/bin/bash
cd "$(dirname "$0")"
sudo apt install -y nodejs npm

npm install node-red
npm install express

node node-red.js
