# Request-URL Parameters

Each field has one of the following formats:

``` field format
[key]
[key]=[conditional]
[key]=[data]
[key]=[conditional]|[data]
```

If no conditional was given it defaults to `1`.

The key defines which data should be included in the clients request,
while the conditional defines if or when the conditional should be included.
The data field can be any string for the client to process before making a
request.

``` field format
Examples:
tETH-1=somelabel
tBTC-1=somelabel
r=/some/path/to/a/file.json
tETH
tBTC
p=2535        // key = p, conditional = 1
p=-2535       // key = p, conditional = 0
p=25.35       // key = p, conditional = 0
p=n2535       // key = p, conditional = 1(per default), data = n2535
p=25.35       // key = p, conditional = 1(per default), data = 25.35
x=new|phone   // key = x, conditional = new, data = phone
```

The following fields are supported as Request-URL paramters:

| Parameter | key | Description |
| --- | --- | --- |
| Target | t\<ChainName\> | Simple crypto address with proof |
| Nonce | n | Random Nonce for the client to sign |
| Matrix Address | m | The matrix address of the user; to be used for chatting or automated chat-messages |
| Contact | c | BIP-32 conform crypto address path |
| Address | a | Simple crypto address |
| Image | i | Base64 encoded bitmap image |
| Pincode | p | Pincode |
| Generic Data/ x-data | x | Generic string for the client to sign |
| Device ID | d | Device metadata to identify the client as implemented in |
| JSON | j | A path to a same-origin-JSON to support additional features |
| Walletname | w | A human-readable description of the wallet, e.g. "iPhone 13 Pro from Felix" |

The following conditionals are supported:

| Conditional | Description |
| --- | --- |
| 1 | true - always include in the requset |
| 0 | false - don't include in the requset |
| nox | include if no x-data is included |
| x | include if x-data is included |
| new | include if the requet host is unknown to the client |
| has | include if the request host is already known to the client |

Every positive integer is interpreted as conditional `1`,
while every integer less then or equal `0` is interpreted as `0`.
