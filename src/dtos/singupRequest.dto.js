class SignupRequestDTO {
  constructor({ username, password,role = "customer", filename }) {
    this.username = username;
    this.password = password;
    this.filename = filename;
    this.role = role
  }

  isValid() {
    if (
      typeof this.username === 'string' &&
      typeof this.password === 'string' &&
      this.username !== '' &&
      this.password !== '' &&
      this.filename !== '' &&
      this.password.length > 7
    ) {
      return true;
    }

    return false;
  }
}

module.exports = SignupRequestDTO;
