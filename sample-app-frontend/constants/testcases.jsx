export const testcases = {
    default: {
        name: 'default',
        scanned: ['uri', 'nonce', 'salt', 'protocol_version', 'client_version'],
        confirmed: [
            'auth_adr', 'auth_sig', 'device', 'nonce', 'salt', 'sig_target', 'uri', 'wallet_name', 'target_adr', 'protocol_version', 'client_version'],
        authorization: true
    },
}