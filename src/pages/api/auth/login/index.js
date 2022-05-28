import AuthController from "../auth.controller";

export default async function handleLogin(req, res, controller = null) {
  return new Promise(async (resolve, reject) => {
    try {
      const authController = controller || new AuthController();
      await authController.login(req, res);
    } catch (err) {
      res.status(500).json(err.toString());
    }
  });
}
