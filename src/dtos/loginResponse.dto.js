class LoginResponseDTO {
  constructor(accessToken, user, imageUrl) {
    this.accessToken = accessToken;
    this.user = {
      username: user.username,
      email: user.email,
      role: user.role,
    };
    this.profile = imageUrl;
  }
}

module.exports = LoginResponseDTO;
