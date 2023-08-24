import { Request, Response } from 'express';
import { INonceSocket, IScanReturn, EStatusCode, getSocketFromNonceSocketMap, IExecuteReturn, verifyMsg } from 'nomo-id';




export async function qrExecuteDefault(req: Request, res: Response, nonceSocketMap?: INonceSocket[]): Promise<IExecuteReturn> {
    const { nonce, auth_adr, auth_sig, uri }: { nonce: any, auth_adr: any, auth_sig: any, uri: any } = req.body;

    let socket: any | undefined = undefined;
    if (nonceSocketMap) {
        socket = getSocketFromNonceSocketMap(nonce, nonceSocketMap);
    }

    let verified = verifyMsg(auth_adr, auth_sig, uri);

    if (verified && socket) {
        socket.emit("execute_default", req.body);
        return {
            statusCode: EStatusCode.SUCCESS
        }
    } else if (!verified && socket) {
        socket.emit("execute_default", 'verification failed');
        return {
            statusCode: EStatusCode.SUCCESS
        }
    } else if (verified && !socket) {
        return {
            statusCode: EStatusCode.SUCCESS
        }
    } else {
        return {
            statusCode: EStatusCode.ERROR
        }
    }
}

export async function qrScanDefault(req: Request, res: Response, nonceSocketMap?: INonceSocket[]): Promise<IScanReturn> {

    const { nonce }: { nonce: any } = req.body;
    let socket: any | undefined = undefined;
    if (nonceSocketMap) {
        socket = getSocketFromNonceSocketMap(nonce, nonceSocketMap);
    }

    if (socket) {
        console.log('--- emitting scan event ---');
        socket.emit("scan_default", req.body);
        return {
            statusCode: EStatusCode.SUCCESS,
            button_text: "Authorize",
            explanation_text: "Do you allow the Nomo test page to access the requested data?"
        }
    } else {
        return {
            statusCode: EStatusCode.SUCCESS,
            button_text: "Authorize",
            explanation_text: "Do you allow the Nomo test page to access the requested data?"
        }
    }
}