import { Request, Response } from 'express';
import { IExecuteReturn, INonceSocket, IScanReturn } from './common';

export interface IAuthorizedScan {
  (req: Request, res: Response, nonceSocketMap?: INonceSocket[]): Promise<IScanReturn>;
};

export interface IAuthorizedExecute {
  (req: Request, res: Response, nonceSocketMap?: INonceSocket[]): Promise<IExecuteReturn>;
}