import { INonceSocket, initializeNonceSocketMap, addSocketToNonceSocketMap, authorize } from '../backend-library';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import { qrExecuteDefault, qrScanDefault } from './functions/qrCodeScanExecuteDefault.js';
import { CreateRandomNonce } from './local/utils.js';

const app = express();
const port = 8095;
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const io = new Server(server, { cors: { origin: "*" } });
let nonceSocketMap: INonceSocket[] = initializeNonceSocketMap();

io.on('connection', (socket) => {
    console.log('new socket connection');
    console.log(socket.id);

    const client_nonce = CreateRandomNonce(8);
    addSocketToNonceSocketMap(client_nonce, socket, nonceSocketMap);
    socket.emit("client_nonce", client_nonce);

    socket.on("disconnect", (reason) => {
        console.log('--- socket closed ---');
        console.log(socket.id);
    });
});

const [executeDefault, scanDefault] = authorize(qrExecuteDefault, qrScanDefault);

app.post("/backend/qrScanDefault", (req, res, next) => {
    scanDefault(req, res, nonceSocketMap);
});

app.post("/backend/qrExecuteDefault", (req, res, next) => {
    executeDefault(req, res, nonceSocketMap);
});

server.listen(process.env.PORT || port, () => {
    console.log(`--- Server started on port ${port} ---`);
});