import { INonceSocket } from '../interfaces/common';
import { IWebSocket } from '../interfaces/common';
import message from 'bitcoinjs-message';


/**
 * Initializes an empty nonce-socket map
 * @returns an empty nonce-socket map {@link INonceSocket}
 */
function initializeNonceSocketMap(): INonceSocket[] {
  let nonceSocketMap: INonceSocket[] = [];
  return nonceSocketMap;
}

/**
 * Adds a new entry into the given nonce-socket map
 * @param nonce The nonce generated for the socket
 * @param socket The socket object {@link any}
 * @param nonceSocketMap The nonce-socket map {@link INonceSocket}
 */
function addSocketToNonceSocketMap(nonce: string, socket: any, nonceSocketMap: INonceSocket[]): void {
  nonceSocketMap.push({ nonce: nonce, socket: socket });
}

/**
 * Get a socket object {@link any} from the socket map {@link INonceSocketMap} or undefined
 * if socket object does not exist
 * @param nonce The nonce used to identify the socket object
 * @param nonceSocketMap The nonce-socket map to retrieve the socket object 
 * @returns a socket object or undefined if no socket object is found in the given nonce-socket map
 */
function getSocketFromNonceSocketMap(nonce: string, nonceSocketMap: INonceSocket[]): any | undefined {
  const mapEntry = nonceSocketMap.find(s => s.nonce === nonce);
  return mapEntry?.socket;
}

/**
 * Verifies a message {@link any} with a given signature {@link any} and address {@link any}
 * @param addr The address to verify the message with
 * @param sig The signature to verify the message with
 * @param msg The message to verify
 * @returns true if the message is verified, false otherwise
 */
function verifyMsg(addr: any, sig: any, msg: any) {
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

  if (!addr) return false;
  try {
    return message.verify(msg, addr, sig, EuroCoin.messagePrefix);
  } catch (e) {
    console.log("VerifyMsg:", e);
    return false;
  }
}

/**
 * Remove a socket object {@link IWebSocket} from a given nonce-socket map {@link INonceSocketMap}
 * @param nonce The nonce used to identify the socket object
 * @param nonceSocketMap The map to remove the socket object from
 */
function removeSocketFromNonceSocketMap(nonce: string, nonceSocketMap: INonceSocket[]): void {
  const mapEntryIndex = nonceSocketMap.findIndex(s => s.nonce === nonce);
  nonceSocketMap.splice(mapEntryIndex, 1);
}



export {
  initializeNonceSocketMap,
  addSocketToNonceSocketMap,
  removeSocketFromNonceSocketMap,
  getSocketFromNonceSocketMap,
  verifyMsg
};