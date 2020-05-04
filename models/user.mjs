import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// src
import { verifyJwtToken, generateNewJwtToken } from "../util/index.mjs";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    minlength: 8,
    maxlength: 42,
    lowercase: true,
  },
  email: {
    type: String,
    unique: true,
    maxLength: 42,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 42,
  },
  restaurants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
  ],
  accessToken: {
    type: String,
  },
  role: {
    type: String,
    default: "basic",
    enum: ["basic", "restaurantOwner", "admin"],
  },
});

userSchema.statics.findByAuthHeader = async (authHeader) => {
  // strip out 'Bearer' from token
  const authToken = authHeader ? authHeader.slice(7, authHeader.length) : "";
  const decodedAuthToken = await jwt.decode(authToken);
  const { userId } = decodedAuthToken;

  const user = await User.findById(userId);

  return user;
};

userSchema.statics.findByLogin = async function (login) {
  let user = await this.findOne({
    username: login.toLowerCase(),
  });

  if (!user) {
    user = await this.findOne({ email: login.toLowerCase() });
  }

  return user;
};

userSchema.statics.refreshAccessToken = async function (userId) {
  try {
    // find the user
    const user = await User.findById(userId);

    if (!user) throw new Error("Not Found");

    // verify their access token is still valid
    const { accessToken, email, username } = user;
    const login = email && email.length ? email : username;

    // verifyJwtToken throws an error if token is invalid
    const result = await verifyJwtToken(accessToken);
    const newToken = generateNewJwtToken(login, userId);

    // update user
    user.update({
      accessToken: newToken,
    });

    return { ...user._doc, accessToken: newToken };
  } catch (err) {
    throw new Error("Not Found");
  }
};

userSchema.statics.authenticate = async (login, password) => {
  try {
    const user = await User.findByLogin(login);
    if (!user) throw new Error("Not Found");

    // validate password
    await user.validatePassword(password);

    // generate a token
    const newToken = generateNewJwtToken(login, user._doc._id);

    // update access token
    const authUser = await user.update({
      accessToken: newToken,
    });

    return { ...user._doc, accessToken: newToken };
  } catch (err) {
    throw err;
  }
};

userSchema.statics.updateRole = async (authHeader, role) => {
  const user = await User.findByAuthHeader(authHeader);
  const userResult = await user.update({
    role: role,
  });

  return userResult;
};

userSchema.pre("remove", function (next) {});

userSchema.pre("save", async function () {
  this.password = await this.generatePasswordHash();
});

userSchema.methods.generatePasswordHash = async function () {
  const saltRounds = 10;
  return await bcrypt.hash(this.password, saltRounds);
};

userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
