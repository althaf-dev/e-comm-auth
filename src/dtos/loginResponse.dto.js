class LoginResponseDTO {
  constructor(accessToken, user) {
    this.accessToken = accessToken;
    this.user = {
      username: user.username,
      email: user.email,
      role: user.role,
      profile: user.profile
    };

  }
}

module.exports = LoginResponseDTO;
