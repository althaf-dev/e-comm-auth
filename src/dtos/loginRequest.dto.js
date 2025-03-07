class LoginRequestDTO {
  constructor({ username, password }) {
    this.username = username;
    this.password = password;
  }

  isValid() {
    if (
      typeof this.username === 'string' &&
      typeof this.password === 'string' &&
      this.username !== '' &&
      this.password !== '' &&
      this.password.length > 2
    ) {
      return true;
    }

    return false;
  }
}

module.exports = LoginRequestDTO;
