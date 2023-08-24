import { Request, Response } from 'express';
import { IAuthorizedScan, IAuthorizedExecute } from '../interfaces/functions';
import { INonceSocket } from '../interfaces/common';
import { EGuardStatusCode, EGuardStatusMessage, EStatusCode, EStatusMessage } from '../enums/common';
import { Guard } from './guard';
import { handleError, QRError } from './qr-error';


/**
* 
* @param execute_lambda The execute method that performs the authenticate process.
* @param scan_lambda The scan method can be used to override the default information that
* is being shown to the user on the Nomo App. This method should be called before the execute
* method to provide the user information on what the user is going to authenticate.
* @returns array of methods: execute (mandatory) | scan (optional)
*/
function authorize(execute_lambda: IAuthorizedExecute, scan_lambda: IAuthorizedScan): Function[] {

  async function scan(req: Request, res: Response, nonceSocketMap?: INonceSocket[]): Promise<void> {
    try {

      const { nonce, salt }: { nonce: string, salt: string } = req.body;
      if (!nonce) { throw new QRError(EStatusMessage.NONCE_MISSING, EStatusCode.NONCE_MISSING); }
      if (!salt) { throw new QRError(EStatusMessage.SALT_MISSING, EStatusCode.SALT_MISSING); }

      Guard.getInstance().addNonceSaltMapEntry(nonce, salt);

      const scan_lambda_json = await scan_lambda?.(req, res, nonceSocketMap);
      const status_code: EStatusCode = scan_lambda_json.statusCode;

      res.set('Content-Type', 'application/json');

      if (status_code === EStatusCode.SUCCESS || status_code === EStatusCode.RETRY) {
        res.status(status_code).json(scan_lambda_json);
      } else {
        res.status(status_code).json(scan_lambda_json.error_message);
        Guard.getInstance().removeNonceSaltMapEntry(nonce);
      }
    } catch (error) {
      handleError(error, req, res);
    }
  }

  async function execute(req: Request, res: Response, nonceSocketMap?: INonceSocket[]): Promise<void> {
    try {
      const { nonce, salt }: { nonce: string, salt: string } = req.body;
      if (!nonce) { throw new QRError(EStatusMessage.NONCE_MISSING, EStatusCode.NONCE_MISSING); }
      if (!salt) { throw new QRError(EStatusMessage.SALT_MISSING, EStatusCode.SALT_MISSING); }

      if (!Guard.getInstance().checkNonceSaltMapEntryExists(nonce, salt)) {
        throw new QRError(EGuardStatusMessage.NONCE_SALT_MISSING, EGuardStatusCode.NONCE_SALT_MISSING);
      }

      let execute_lambda_json = await execute_lambda(req, res, nonceSocketMap);
      const status_code: EStatusCode = execute_lambda_json.statusCode;

      res.set('Content-Type', 'application/json');

      if (status_code === EStatusCode.SUCCESS || status_code === EStatusCode.RETRY) {
        res.status(status_code).json(execute_lambda_json.msg);
      } else {
        res.status(status_code).json(execute_lambda_json.error_message);
      }

      Guard.getInstance().removeNonceSaltMapEntry(nonce);
    } catch (error) {
      handleError(error, req, res);
    }
  }

  return [execute, scan];
}

export { authorize };