# Sample App Backend

This is the backend for the [sample app frontend](https://g.fastprj.tech/nomo/nomo-id/-/tree/master/sample-app-frontend).
It is a node.js app that uses [Express](https://expressjs.com/) and [Socket.IO](https://socket.io/).

## Getting Started

1. First, install the dependencies:

    ```bash
    npm install
    ```

2. Run the development server:

    ```bash
    npm start run
    ```

    If everything is working correctly, you should see the following output:

    ```bash
    --- Server started on port 8095 ---
    ```

## Information

- When a socket connection is established, a random nonce will be generated and sent to the client.

- Clients can communicate with the server using Socket.IO events.

- The server provides two endpoints for QR code scanning and execution:

    1. POST /backend/qrScanDefault: Endpoint for QR code scanning.
    2. POST /backend/qrExecuteDefault: Endpoint for QR code execution.
