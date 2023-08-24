# Distributed Key-Value Storage

This protocol defines a distributed key-value storage that allows a server to store or retrieve values within a client-app.
All keys are authenticated with a server-chosen private key.
This ensures that values are protected against unauthorized queries because a value can only be queried by a server who knows an associated private key.

We describe this protocol in two different parts: Storing/deleting values and querying values.

## 1. Storing/deleting values

To store or delete values, we define a procedure over two POST-requests.

### 1.1 First POST-request

The first POST-request is sent by an App immediately once a QRCode gets scanned or a deeplink gets clicked.
The request-body of the first POST-request includes a `salt`-property. The `salt`-property must be temporarily stored by the backend because it is needed for the second POST-request. The purpose of the `salt`-property is to protect against replay-attacks where a malicious backend tries to issue unauthorized commands against a key-value storage.

### 1.2 Second POST-request

The second POST-request is sent by the App once a user clicks a button to authenticate.
To store or delete values, a backend must craft a specific response to this POST-request as follows:

- The status-code must be 200.
- The response-body must include an array of "SigObjects" as follows:

```plain
> signatures: [{
> sig: <a hex-encoded ecdsa-signature as specified in 1.2.1>
> coin: <"ETH" | "BTC" | "EURO">
> name: <some string that is a part of the key for the key-value-storage>
> data: <a string that should be stored into the key-value-storage, or null if the entry should be deleted>
> }]
```

#### 1.2.1 sig for storing/deleting values

`sig` in a SigObject is used to derive keys for the key-value-storage.
To store or delete values, `sig` must be a signature of `salt || name || data`.
`sig` must use an algorithm that matches `coin` in SigObject.
For example, for Eurocoin, `sig` must use the hash-prefix `\x19Eurocoin Signed Message:\n`.

## 2. Querying values

For querying values, we define another procedure that spans over two POST-requests.

### 2.1 First POST-request

The request-body of the first POST-request includes a `salt`-property that must be interpreted on the fly while processing the request.
Specifically, the reponse to the first POST-request must include a `signatures`-property (along with other properties like dynamic screen contents).
This `signatures`-properties must be an array of "SigObjects" as follows:

```plain
> signatures: [{
> sig: <a hex-encoded ecdsa-signature as specified in 2.1.1>
> coin: <"ETH" | "BTC" | "EURO">
> name: <some string that is a part of the key for the key-value-storage>
> }]
```

#### 2.1.1 sig for querying values

`sig` in a SigObject is used to derive keys for the key-value-storage.
To query values, `sig` needs to be a signature of `salt || name`.

### 2.2 Second POST-request

When the user clicks an authenticate-button, the request-body of the second POST-request will include an array of "SigObjects".
The most relevant of those properties is the `data`-property, which represents the value that is being queried:

```plain
>[{
> sig: <the signature that was used for storing this value>
> coin: <"ETH" | "BTC" | "EURO">
> name: <some string that is a part of the key for the key-value-storage>
> data: <the value that is queried from the key-value-storage>
>}]
```
