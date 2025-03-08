const Mongose = require("mongoose");

const userSchema = new Mongose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = Mongose.model("User", userSchema);

async function findUserByName(name) {
  const existingUser = await User.findOne({ username:name});
  console.log("find user serice",existingUser);
  if (existingUser) return existingUser;
  return -1;
}

async function createUser(user) {
  try {
    const data = await User.collection.insertOne(user);
    return data;
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = { findUserByName, createUser };
