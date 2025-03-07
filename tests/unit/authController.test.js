const LoginResponseDTO = require("../../src/dtos/loginResponse.dto");
const AuthService = require("../../src/services/auth.service");
const request = require("supertest");
const app = require("../../src/app");

jest.mock("../../src/services/auth.service.js");
describe("auth controller test",()=>{
    test("✅ Should return 200 & tokens on successful login",async ()=>{
        const loginDto = new LoginResponseDTO("test","pas")
        AuthService.loginUser.mockResolvedValue(loginDto);

        const response = await request(app).post("/api/login").send({
            username:"terst",
            password :"te12"
        });

        expect(response.status).toBe(200);
    })
})