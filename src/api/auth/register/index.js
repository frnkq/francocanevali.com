import AuthController from "../auth.controller";

export default async function handleRegister(req, res) {
  return new Promise(async (resolve, reject) => {
    try {
      const authController = new AuthController();
      await authController.register(req, res);
      resolve();
    } catch (err) {
      res.status(500).json(err.toString());
      reject(err);
    }
  });
}
