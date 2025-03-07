const LoginResponseDTO = require('../../src/dtos/loginResponse.dto');
const AuthService = require('../../src/services/auth.service');
const request = require('supertest');
const app = require('../../src/app');
const authTestData = require('../testData/authTestData');
const SignupResponseDTO = require('../../src/dtos/signupResponse.dto');

jest.mock('../../src/services/auth.service.js');
describe('auth controller test', () => {
  test('✅ Should return 200 & tokens on successful login', async () => {
    const { username, email, accessToken, imageUrl } = authTestData;
    const user = { username, email };
    const loginDto = new LoginResponseDTO(accessToken, user, imageUrl);
    console.log("from tes",loginDto)
    AuthService.loginUser.mockResolvedValue(loginDto);

    const response = await request(app)
      .post('/api/v1/login/')
      .set('Accept', 'application/json')
      .send({
        username: authTestData.username,
        password: authTestData.password,
      });

    expect(response.status).toBe(200);
    expect(response.body.user.username).toBe(authTestData.username);
    expect(response.body.user.email).toBe(authTestData.email);
    expect(response.body.accessToken).toBe(authTestData.accessToken);
    expect(response.body.profile).toBe(authTestData.imageUrl);

  });

  test('✅ Should return 200 & tokens on successful user creation', async () => {


      const { username,role,imageUrl} = authTestData;
      const signDto = new SignupResponseDTO({username,role,imageUrl})

      AuthService.signupUser.mockResolvedValue(signDto);
      const response = await request(app)
      .post('/api/v1/signup/')
      .set('Accept', 'application/json')
      .send({
          username: authTestData.username,
          password: authTestData.password,
      });

      expect(response.status).toBe(200);
      expect(response.body.username).toBe(authTestData.username);
      expect(response.body.role).toBe(authTestData.role);
      expect(response.body.message).toBe("User added successfully");
  });
});
