# Hive-RED
Simple Node-RED setup environment

## Concept

When you install Node-RED globally, it is installed on your system.  
Hive-RED installs Node-RED for each project.  
Each folder where you download Hive-RED has a different Node-RED environment.  

![concept.jpg](./images/concept.jpg)

## Features

- **Portable**: Node-RED runs within the project folder.
- **Cross-platform**: Works on Windows, macOS, and Linux.
- **Easy Setup**: Just install dependencies and start.

## How to use

Node.js must be installed in advance.  
Node.js: <https://nodejs.org/en/download>

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start Node-RED:
   ```bash
   npm start
   ```

   The server will start on port 8000 (or the next available port).
   - Editor: http://localhost:8000/red
   - API: http://localhost:8000/api

3. Reset Environment (Optional):
   If you want to clear all data and installed modules to start fresh:
   ```bash
   npm run reset
   ```
   **Warning**: This will delete the `data` directory and `node_modules`.

## Directory Structure

- `data/`: Node-RED user directory (settings, flows, sessions, etc.).
- `settings.js`: Node-RED configuration file.

## Managing Dependencies

To ensure that users who download your project have the necessary nodes installed, you should install nodes into the project's `package.json`.

**To install a new node:**
Run the following command in the project root:

```bash
npm install node-red-contrib-example-node
```

This adds the node to the `dependencies` in `package.json`. When others download your project and run `npm install`, these nodes will be installed automatically.
