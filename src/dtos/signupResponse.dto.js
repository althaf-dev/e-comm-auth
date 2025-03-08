class SignupResponseDTO {

    constructor({ username,role, profile }) {
      this.username = username;
      this.role = role;
      this.profile = profile;
      this.message = "User added successfully"
    }
  }
  
  module.exports = SignupResponseDTO;
  