import crypto, { sign } from 'crypto';
import message from 'bitcoinjs-message';

// TODO: Remove EuroCoin and VerifyMsg once the backend library is published
const EuroCoin = {
    messagePrefix: "\x19Eurocoin Signed Message:\n",
    bip32: {
        public: 0x0488b21e,
        private: 0x0488ade4,
    },
    pubKeyHash: 87,
    scriptHash: 88,
    wif: 0x80,
    dustThreshold: 1,
};

export function VerifyMsg(addr: any, sig: any, msg: any) {
    if (!addr) return false;
    try {
        return message.verify(msg, addr, sig, EuroCoin.messagePrefix);
    } catch (e) {
        console.log("VerifyMsg:", e);
        return false;
    }
}

export function CreateXDataMarkdownContent(data: any) {
    let react_markdown = "";
    if (data) {
        for (const [key, value] of Object.entries(data)) {
            react_markdown += "**" + key + "**: " + value + " \n";
        }
    }
    return react_markdown.trim();
}

export function CreateRandomNonce(nonce_length: any) {
    return crypto.randomBytes(nonce_length).toString("hex");
}

export let client_dictionary: any = {};