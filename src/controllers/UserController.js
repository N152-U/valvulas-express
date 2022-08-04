const { UserService } = require("../services/index.js");
const auth = require("../utils/auth.js");
const jwt = require("jsonwebtoken");
const APIError = require("../utils/error.js");

module.exports = {
  // CREATE
  signup: async (req, res, next) => {
    try {
      const { body } = req;
      const { authorization } = req.headers;
      const token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userCreated = await UserService.signup(decoded.id,body);
      await UserService.registerUserLogByUserID(
        decoded.id,
        userCreated.id,
        1,
        "users",
        userCreated
      );

      res.status(201).json({ message: "User created", payload: userCreated });
    } catch (error) {
      Telegram.setToken(process.env.BOT_TOKEN);
      Telegram.setRecipient(process.env.CHAT_DEV_ID);
      const encodedURI = encodeURI(error);
      Telegram.setMessage(encodedURI);
      Telegram.send();
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },

  //LOGIN
  login: async (req, res, next) => {
    try {
      console.log(req.connection.remoteAddress);
      const { username, password } = req.body;
      const ipLogin = req.connection.remoteAddress;
      const user = await UserService.findOneByUsername(username);

      if (!user) throw new APIError("Error on credentials.", 400);
      if (!user.status) throw new APIError("User Not Active", 400);
      const isValid = auth.comparePasswords(password, user.password);
      if (!isValid) throw new APIError("Error on credentials.", 400);
      await UserService.registerIpAndLastLogin(user.id, ipLogin);
      const token = auth.createToken(user);
      res.status(200).json({ message: "Log in", payload: token });
    } catch (error) {
      Telegram.setToken(process.env.BOT_TOKEN);
      Telegram.setRecipient(process.env.CHAT_DEV_ID);
      const encodedURI = encodeURI(error);
      Telegram.setMessage(encodedURI);
      Telegram.send();
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },
  // READ ALL BY STATUS TRUE
  getAll: async(req, res, next) => {
    try {
        const users = await UserService.getAll();
        res.status(200).json({ payload: users });
    } catch (error) {
      Telegram.setToken(process.env.BOT_TOKEN);
      Telegram.setRecipient(process.env.CHAT_DEV_ID);
      const encodedURI = encodeURI(error);
      Telegram.setMessage(encodedURI);
      Telegram.send();
        (process.env.DEBUG) ? next(console.trace(error)): next(error);
    }
},

  // READ BY ID
  getById: async (req, res, next) => {
    try {
      const { hash } = req.params;
      const user = await UserService.getById(hash);
      user["hashRole"]=user["roles.hash"];
      delete user["roles.hash"];
      res.json({ payload: user });
    } catch (error) {
      Telegram.setToken(process.env.BOT_TOKEN);
      Telegram.setRecipient(process.env.CHAT_DEV_ID);
      const encodedURI = encodeURI(error);
      Telegram.setMessage(encodedURI);
      Telegram.send();
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },
  // UPDATE
  update: async (req, res, next) => {
    try {
      const { hashUser } = req.params;
      const { authorization } = req.headers;
      const token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { hashRole, username, password, firstName, middleName, lastName } =
        req.body;
      const updatedUser = await UserService.update(
        hashUser,
        hashRole,
        username,
        password,
        firstName,
        middleName,
        lastName,
        decoded.id
      );
     
      await UserService.registerUserLogByUserID(
        decoded.id,
        updatedUser.id,
        2,
        "users",
        updatedUser
      );
      res.status(200).json({ message: "User has been updated" });
    } catch (error) {
      Telegram.setToken(process.env.BOT_TOKEN);
      Telegram.setRecipient(process.env.CHAT_DEV_ID);
      const encodedURI = encodeURI(error);
      Telegram.setMessage(encodedURI);
      Telegram.send();
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },
  // DELETE
  deleteOne: async (req, res, next) => {
    try {
      const { hash } = req.params;
      
      const { authorization } = req.headers;
      const token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      const deletedUser = await UserService.deleteOne(hash);

      await UserService.registerUserLogByUserID(
        decoded.id,
        deletedUser.id,
        3,
        "users",
        deletedUser
      );
      res.status(200).json({ message: "User has been deleted" });
    } catch (error) {
      Telegram.setToken(process.env.BOT_TOKEN);
      Telegram.setRecipient(process.env.CHAT_DEV_ID);
      const encodedURI = encodeURI(error);
      Telegram.setMessage(encodedURI);
      Telegram.send();
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },

  // READ ALL USER PERMISSIONS
  getAllPermissionsByUsername: async (req, res, next) => {
    try {
      const { username } = req.params;

      if (req.user.username == username || req.user.role == "ADMIN") {
        const user = await UserService.findOneByUsernameWithRolePermissions(
          username
        );
        res.json({
          payload: { role: user.role, permissions: user.permissions },
        });
      } else {
        throw new APIError("Not Authorized", 403);
      }
    } catch (error) {
      Telegram.setToken(process.env.BOT_TOKEN);
      Telegram.setRecipient(process.env.CHAT_DEV_ID);
      const encodedURI = encodeURI(error);
      Telegram.setMessage(encodedURI);
      Telegram.send();
      if (process.env.DEBUG) next(console.trace(error));
      next(error.message);
    }
  },

};
