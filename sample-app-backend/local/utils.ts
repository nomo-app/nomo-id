import crypto from 'crypto';

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