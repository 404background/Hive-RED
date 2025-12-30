const path = require("path");

module.exports = {
    // Port to listen on
    port: 8000,

    // Node-RED user directory (where settings and node modules are stored)
    // Use 'data' folder within the project
    userDir: path.join(__dirname, "data"),

    // Path to the admin UI
    httpAdminRoot: "/red",

    // Path to the API
    httpNodeRoot: "/api",

    // Global context
    functionGlobalContext: {
        // Add modules as needed
        // os: require('os'),
    },

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
