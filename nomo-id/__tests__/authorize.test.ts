import { authorize } from "../src/index";
import { executeLambda, scanLambda } from "../mock/functions";

test('authorize basic', () => {
  const [execute, scan] = authorize(executeLambda, scanLambda);
  expect(execute.name).toEqual('execute');
  expect(scan.name).toEqual('scan');
});