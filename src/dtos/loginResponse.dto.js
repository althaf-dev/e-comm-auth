class LoginResponseDTO {
  constructor(accesToken, user, imageUrl) {
    this.accesToken = accesToken;
    this.user = {
      username: user.username,
      email: user.email,
      role: user.role,
    };
    this.profile = imageUrl;
  }
}

module.exports = LoginResponseDTO;
