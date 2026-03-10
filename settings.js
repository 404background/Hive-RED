const path = require("path");

module.exports = {
    // Port to listen on
    port: 8000,

    // Node-RED user directory (where settings and node modules are stored)
    // Use '.nodered' folder within the project
    userDir: path.join(__dirname, ".nodered"),

    // Path to the admin UI
    httpAdminRoot: "/red",

    // Path to the API
    httpNodeRoot: "/api",

    // Global context
    functionGlobalContext: {
        // Add modules as needed
        // os: require('os'),
    },
    functionExternalModules: true,

    // Logging configuration
    logging: {
        console: {
            level: "info",
            metrics: false,
            audit: false
        }
    },

    // Editor theme settings (as needed)
    editorTheme: {
        projects: {
            // Disable the projects feature as Hive-RED manages the project itself
            enabled: false
        }
    }
};
