var http = require('http');
var express = require("express");
var RED = require("node-red");
var path = require("path");
var net = require("net");

var app = express();
app.use("/", express.static("public"));
var server = http.createServer(app);

var init_port = process.argv[2] ? parseInt(process.argv[2], 10) : 8000;

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

function checkPort(port, callback) {
    var tester = net.createServer();
    tester.once('error', function(err) {
        if (err.code === 'EADDRINUSE') {
            callback(true);
        }
    });
    tester.once('listening', function() {
        tester.once('close', function() {
            callback(false);
        });
        tester.close();
    });
    tester.listen(port);
}

function startServer(port) {
    checkPort(port, function(inUse) {
        if (inUse) {
            startServer(port + 1);
        } else {
            server.listen(port, () => {
                const url = `http://localhost:${port}`;
                console.log(`Node-RED started at ${url}`);
                console.log(`Admin UI available at ${url}${settings.httpAdminRoot}`);
                RED.start();
            });
        }
    });
}

startServer(init_port);
