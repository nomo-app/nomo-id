import { Request, Response } from "express";
import { IExecuteReturn, IScanReturn } from "../src/interfaces/common";

async function executeLambda(req: Request, res: Response): Promise<IExecuteReturn> {
  return {
    statusCode: 200
  };
}

async function scanLambda(req: Request, res: Response): Promise<IScanReturn> {
  return {
    statusCode: 200
  };
}

export {
  executeLambda,
  scanLambda
};