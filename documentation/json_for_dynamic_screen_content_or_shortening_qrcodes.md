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

## Merged URL-parameters

In addition to the above-specified properties, the JSON may contain any of the URL-parameters that are specified in <https://y.vougee.gmbh/articles/VGWE-A-3/Request-URL-Parameters>. If the same parameter is present in both the QRCode and the JSON, then the JSON should take precedence. This enables a flexible server-side-control of the behavior, especially in the case of long-living QRCodes.

## Security considerations

An implementation should highlight the origin-domain in bold text, regardless of what the explanation-text is saying.
An implementation should *not* fallback to a generic authentication-screen when a JSON-fetch fails; instead it should show an error-message. This should prevent attacks where a JSON-fetch is maliciously blocked in a network.

## Cross-domain address-reuse via sig_domain

By default, we use a BIP32-address-derivation that depends on the origin-domain, e.g. the scheme described in <https://y.vougee.gmbh/articles/VGWE-A-5/BIP32-Key-Derivation>.
However, there exist use cases that want to re-use addresses across multiple domains. For such use cases, we propose an address-derivation-scheme that depends on an (arbitrary) public-key.
This scheme should be used when a `sig_domain` is present in the JSON.
The scheme works as follows:

* Compute a public-key from `sig_domain` and the origin-domain as input into `sig_domain`.
* From the resulting public-key, take the first 16 bytes to form the following BIP32-derivation-path:

`littleEndian(pubkeybytes[0-3]) / littleEndian(pubkeybytes[4-7]) / littleEndian(pubkeybytes[8-11]) / littleEndian(pubkeybytes[12-15])`

* When posting an authentication-request to the origin-domain, `sig_domain` and the previously computed public-key should be included in the payload.

## Implementation details

An implementation may localize the JSON based on HTTP-headers like `Accept-Language`.
An implementation should show a loading-indicator while this JSON is being fetched.
