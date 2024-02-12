const uuid = require("uuid");

class User {
  users = {};
  createUser(email, hashedPassword) {
    // console.log(this.users[email]);
    if (this.users[email] === undefined) {
      this.users[email] = {
        _id: uuid.v4(),
        email: email,
        password: hashedPassword,
      };
      return true;
    } else {
      return Error("User already exists.");
    }
  }
  getUser(email) {
    if (this.users[email] !== undefined) {
      return this.users[email];
    } else {
      return Error("User doesn't exist.");
    }
  }
  getAllUsers() {
    return this.users;
  }
}

module.exports = new User();
