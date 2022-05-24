import { createMocks } from "node-mocks-http";
import handlers from '../../../src/pages/api/handlers';

test("All handlers should return 500 if exception is thrown", async ()=>{
  const controller = ()=>{throw new Error();} 
  const { req, res } = createMocks();
  handlers.forEach(async (handler)=>{
    await handler(req, res, controller).catch((err)=>{
      expect(err).toBeTruthy();
    });
  });
  expect(res._getStatusCode()).toBe(500);
});
