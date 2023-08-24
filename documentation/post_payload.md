# Post Payload

During the authentication-flow, two POST-requests are sent to a URL that is specified in a QRCode.
The first POST-request is optional and only sent if a "JSON for dynamic screen content" is present.
The first POST-request has the following properties:

>       nonce
>       auth_adr,

The second POST-request is sent when a user clicks an authenticate-button.
The second POST-request is the main-request that performs the authentication-task.
If a 201 gets returned, then the second POST-request may be repeated an indefinite number of button-clicks.
The second POST-request has the following properties, some of them are optional:

>         nonce: nonce,
>         auth_adr,
>         xauth_adr,
>         auth_sig,
>         xauth_sig,
>         uri: message,
>         target_adr,
>         sig_target: sig_target ?? undefined,
>         wallet_name: walletName ?? undefined,
>         sig_domain: sigDomain ?? undefined,
>         signatures,
>         device: deviceId ?? undefined,
