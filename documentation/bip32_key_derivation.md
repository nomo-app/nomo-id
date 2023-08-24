# BIP32 Key Derivation

To enable an interoperability between different wallets, implementations are encouraged to use the following key derivation path:

`0 / 100 / 102 / hostId`

`hostId` is a 32bit-integer that is computed from the origin-domain.
The purpose of `hostId` is multifold:

* Improve privacy by deriving different addresses for different origins
* Prevent potential cross-origin-attacks where signatures are reused on different services

`hostId` should be computed as follows:

`hostId := crc32(origin-domain)`
