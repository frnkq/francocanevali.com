import { encryptPassword, comparePassword } from "../../../src/helpers/encryptor";

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

  test("Should throw error if no password is provided for encryption", async () =>{
        return expect(
          (encryptPassword(undefined))
        ).rejects.toEqual("Error: data and salt arguments required");
  });

  test("Should throw error if no password or salt are provided", async () =>{
        return expect(
          (comparePassword(undefined, undefined))
        ).rejects.toEqual("Error: data and hash arguments required");
  });

  test("Should throw error if no password or hash are provided", async () =>{
        return expect(
          (comparePassword("asd", undefined))
        ).rejects.toEqual("Error: data and hash arguments required");
  });

  test("Should throw error if no password or hash are provided", async () =>{
        return expect(
          (comparePassword(undefined, "asd"))
        ).rejects.toEqual("Error: data and hash arguments required");
  });
    
});
