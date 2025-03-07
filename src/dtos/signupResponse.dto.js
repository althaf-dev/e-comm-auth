class SignupResponseDTO {

    constructor({ username,role, filename }) {
      this.username = username;
      this.role = role;
      this.profilePic = filename;
      this.message = "User added successfully"
    }
  }
  
  module.exports = SignupResponseDTO;
  