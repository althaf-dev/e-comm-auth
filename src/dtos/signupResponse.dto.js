class SignupResponseDTO {

    constructor({ username,role, imageUrl }) {
      this.username = username;
      this.role = role;
      this.profile = imageUrl;
      this.message = "User added successfully"
    }
  }
  
  module.exports = SignupResponseDTO;
  