import { Request, Response } from "express";
import { EGuardStatusCode, EStatusCode, EStatusMessage } from "../enums/common";
import { Guard } from "./guard";

export class QRError extends Error {
  public status_code: EStatusCode | EGuardStatusCode;

  constructor(message: string, status_code: EStatusCode | EGuardStatusCode) {
    super(message);
    this.status_code = status_code;
  }
}

export function handleError(error: any, req: Request, res: Response): void {
  const { nonce }: { nonce: string } = req.body;
  if (nonce) { Guard.getInstance().removeNonceSaltMapEntry(nonce); }

  if (error instanceof QRError) {
    res.status(error.status_code).json({ error_message: error.message });
  } else {
    res.status(EStatusCode.ERROR).json({ error_message: EStatusMessage.ERROR });
  }
}