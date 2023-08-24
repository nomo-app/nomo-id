# JSON for dynamic screen content or shortening QRCodes

For some use cases, a generic authentication-screen is not sufficient to provide a consistent user experience.
Therefore, this spec enables a dynamic screen content to adjust an authentication-screen for specific use cases.
One possible use case is a direct minting of coins to the Nomo app, where the user scans a QRCode to enable direct minting.

As specified in the section about URL-parameters, this works by passing a `j`\-parameter with a path to a same-origin-JSON.
The JSON should comply with the following structure; all properties are optional:

> {
> "button_text": \<a short string like "Authenticate", "Login" or similar\>
>
> "explanation_text": \<a string to explain what is being authenticated\>
>
> "xdata": \<a string that is rendered as markdown, shown to the user and signed\>
>
> "image_path": \<a same-origin-path to an image that will be loaded into the authentication-screen\>
>
> "sig_domain": \<a 65-byte base64-encoded ECDSA-signature on curve secp256k1 that signs the domain-name with some key\>
>
> "target": {Nomo: ["label1", "label2"]}
>
> "signatures": [
> {
> "name": \<some value that is needed for key-value-store retrieval\>,
> "coin": \<ETH \| EURO \| BTC\>
> "sig": "hex-encoded ecdsa-sig, needed for key-value-store retrieval",
> }
> ]
> }

## 200 Response

> "signatures":  [
> {
> "sig": "hex-encoded ecdsa-sig", // pubkey := web3.ecrecover(sig, hash)
> "data": "e.g. ETH-address or null -\> if null, then delete sig", // hash := web3.ethSignedMessage(salt \|\| data)
> "name": "some-label",
> }
> ]

## Security considerations

An implementation should highlight the origin-domain in bold text, regardless of what the explanation-text is saying.
An implementation should *not* fallback to a generic authentication-screen when a JSON-fetch fails; instead it should show an error-message. This should prevent attacks where a JSON-fetch is maliciously blocked in a network.

## Implementation details

An implementation may localize the JSON based on HTTP-headers like `Accept-Language`.
An implementation should show a loading-indicator while this JSON is being fetched.
