import io from "socket.io-client";
import { useEffect, useState } from "react";

// currently hardcoded to localhost
const socket_ip = "http://localhost:8095/"

export const useSocket = ({ testcase }) => {

    const [socket, setSocket] = useState(null);
    const [socketResponsesScan, setSocketResponsesScan] = useState()
    const [socketResponsesExecute, setSocketResponsesExecute] = useState()
    const [socketResponses, setSocketResponses] = useState({})
    const [qrLink, setQRLink] = useState('no connection')

    // currently hardcoded
    const server_address = '172.16.250.209:8095/backend';

    useEffect(() => {
        if (!socket) {
            const newSocket = io(socket_ip);
            setSocket(newSocket);
        }

        return () => {
            socket &&
                socket.disconnect();
        };
    }, []);

    useEffect(() => {
        setSocketResponses({
            scanned: socketResponsesScan,
            confirmed: socketResponsesExecute
        })
    }, [socketResponsesExecute, socketResponsesScan]);

    useEffect(() => {
        if (socket) {
            socket.on("connect", () => {
                console.log("connected");
            });

            socket.on("disconnect", () => {
                console.log("disconnected");
            });

            socket.on("client_nonce", data => {
                console.log(data, testcase.name);
                const qrLink = `http://nomo.id/${server_address}/qrExecuteDefault?n=${data}&r=/backend/qrScanDefault`;
                setQRLink(qrLink);
            });

            socket.on("scan_" + testcase.name, data => {
                console.log(testcase.name + '_scan:', data)
                setSocketResponsesScan(Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null)))
            });

            socket.on("execute_" + testcase.name, data => {
                console.log(testcase.name + '_execute:', data)
                setSocketResponsesExecute(Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null)))
            });
        }
    }, [socket]);

    return { socket, socketResponses, qrLink }
}