const methodIsPOST = (req) => req.method === "POST";
const methodNotAllowed = (res) => res.status(405).send();
const badRequest = (res) => res.status(422).send();
const unauthorized = (res) => res.status(401).send();

module.exports = {
  methodNotAllowed,
  unauthorized,
  methodIsPOST,
  badRequest,
};
