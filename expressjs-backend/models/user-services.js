const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const userModel = require("./user.js");
const { MongoClient, SecureApiVersion } = require('mongodb')

// uncomment the following line to view mongoose debug messages
//mongoose.set("debug", true);\

async function run() {
  try {
    let mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();
    
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

  } catch {
    await mongoose.close()
  }
}

async function getAllUsers() {
  let result;
  result = await userModel.find({})
  return result;
}

async function findUserById(id) {
  try {
    return await userModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addUser(user) {
  try {
    const userToAdd = new userModel(user);
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function findUserByName(name) {
  return await userModel.find({ username: name });
}

exports.run = run
exports.addUser = addUser
exports.getAllUsers = getAllUsers
exports.findUserById = findUserById
exports.findUserByName = findUserByName