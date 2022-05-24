import AuthService from "./auth.service";
const {
  badRequest,
  methodIsPOST,
  methodNotAllowed,
  unauthorized,
} = require("../../../helpers/httpResponses");
const emailRegEx = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export default class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  async login(req, res) {
    if (!methodIsPOST(req)) return methodNotAllowed(res);
    const { email, password } = req.body;
    const invalidEmail = !email || !email.match(emailRegEx);
    const invalidPassword = !password;

    if (invalidEmail || invalidPassword) return unauthorized(res);

    const authService = new AuthService();
    const token = await authService.login(email, password);

    if (!token) return unauthorized(res);

    return res.status(200).json(token);
  }

  async register(req, res) {
    if (!methodIsPOST(req)) return methodNotAllowed(res);
    const { email, password, name } = req.body;

    const isEmailValid = email && email.match(emailRegEx);
    const isNameValid = name && name.match(/^[\w\ ]+$/);
    const isPasswordValid =
      password &&
      password.length >= process.env.PASSWORD_MIN_LENGTH &&
      password.length <= process.env.PASSWORD_MAX_LENGTH;

    const isRequestValid = isEmailValid && isPasswordValid && isNameValid;
    if (!isRequestValid) return badRequest(res);
    this.authService.register(email, password, name);
    return res.status(200).json();
  }
}
