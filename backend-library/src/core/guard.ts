import { INonceSalt } from "../interfaces/common";


/**
 * Guard class defines a `getInstance` method that lets the library
 * access the unique Guard singleton instance
 */
export class Guard {
  private static _instance: Guard;
  private _nonceSaltMap: INonceSalt[] = [];

  private constructor() { }

  public static getInstance(): Guard {
    if (!Guard._instance) {
      Guard._instance = new Guard();
    }

    return Guard._instance;
  }

  public addNonceSaltMapEntry(nonce: string, salt: string): void {
    this._nonceSaltMap.push({ nonce: nonce, salt: salt });
  }

  public removeNonceSaltMapEntry(nonce: string): void {
    const mapEntryIndex = this._nonceSaltMap.findIndex(e => e.nonce === nonce);
    this._nonceSaltMap.splice(mapEntryIndex, 1);
  }

  public getNonceSaltMap(): INonceSalt[] {
    return this._nonceSaltMap;
  }

  public checkNonceSaltMapEntryExists(nonce: string, salt: string): boolean {
    const exists = this._nonceSaltMap.some((entry) => {
      return entry.nonce === nonce && entry.salt === salt;
    });

    return exists;
  }

}