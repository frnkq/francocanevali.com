import { encryptPassword, comparePassword } from "../../pages/api/encryptor";

describe("Encryptor", () => {
  test("Should encrypt password", async () => {
    const password = "asd";
    const hashed = await encryptPassword(password);
    expect(typeof hashed).toBe("string");
  });
  test("Should decrypt password", async () => {
    const password = "password";
    const hashed = await encryptPassword(password);
    const doesMatch = await comparePassword(password, hashed);
    expect(doesMatch).toBe(true);
  });
});
