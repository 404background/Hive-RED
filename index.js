const http = require('http');
const net = require("net");
const path = require("path");
const fs = require("fs");

// Check for reset command
if (process.argv[2] === 'reset') {
    console.log("Resetting Hive-RED environment...");
    // Delete 'data' directory and 'node_modules' directory
    const files = ['data', 'node_modules'];
    files.forEach(file => {
        const filePath = path.join(__dirname, file);
        fs.rm(filePath, { recursive: true, force: true }, (err) => {
            if (err) {
                console.error(`Error deleting ${file}:`, err.message);
            } else {
                console.log(`Deleted: ${file}`);
            }
        });
    });
    return;
}

const express = require("express");
const RED = require("node-red");

// Load settings file
const settings = require("./settings");

const app = express();

// Serve static files (create 'public' folder if needed)
app.use("/", express.static("public"));

const server = http.createServer(app);

// Initialize Node-RED
RED.init(server, settings);

// Set up Node-RED editor and API routes
app.use(settings.httpAdminRoot, RED.httpAdmin);
app.use(settings.httpNodeRoot, RED.httpNode);

// Function to check if a port is in use
function checkPort(port, callback) {
    const tester = net.createServer();
    tester.once('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            callback(true);
        } else {
            callback(false); // Return false for other errors or handle them
        }
    });
    tester.once('listening', () => {
        tester.once('close', () => {
            callback(false);
        });
        tester.close();
    });
    tester.listen(port);
}

// Function to start the server (increment port if in use)
function startServer(port) {
    checkPort(port, (inUse) => {
        if (inUse) {
            console.log(`Port ${port} is in use, trying ${port + 1}...`);
            startServer(port + 1);
        } else {
            server.listen(port, () => {
                const url = `http://localhost:${port}`;
                console.log(`\n=================================================`);
                console.log(`Hive-RED is running!`);
                console.log(`Node-RED Editor: ${url}${settings.httpAdminRoot}`);
                console.log(`Node-RED API:    ${url}${settings.httpNodeRoot}`);
                console.log(`User Directory:  ${settings.userDir}`);
                console.log(`=================================================\n`);
            });

            // Start Node-RED
            RED.start();
        }
    });
}

// Start port (default to settings.port or 8000 if not specified)
const init_port = process.argv[2] ? parseInt(process.argv[2], 10) : (settings.port || 8000);

startServer(init_port);
