var http = require('http');
var express = require("express");
var RED = require("node-red");
var path = require("path");

var app = express();
app.use("/", express.static("public"));
var server = http.createServer(app);

var settings = {
    httpAdminRoot: "/red",
    httpNodeRoot: "/api",
    userDir: path.join(__dirname, '.nodered'),
    flowFile: path.join(__dirname, '.nodered', 'flows.json'),
    functionGlobalContext: {}
};

RED.init(server, settings);

app.use(settings.httpAdminRoot, RED.httpAdmin);
app.use(settings.httpNodeRoot, RED.httpNode);

let port = 8000;

function startServer(port) {
    server.listen(port, () => {
        const url = `http://localhost:${port}`;
        console.log(`Node-RED started at ${url}`);
        console.log(`Admin UI available at ${url}${settings.httpAdminRoot}`);
        RED.start();
    }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Port ${port} is in use, trying port ${port + 1}`);
            startServer(port + 1);
        } else {
            console.error(`Failed to start server: ${err.message}`);
        }
    });
}

startServer(port);
