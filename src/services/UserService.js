const {
  User,
  Role,
  Permission,
  Log,
  tPostgres,
} = require("../models/index.js");
const { Sequelize } = require("sequelize");
const { gt, lte, ne, in: opIn, notLike } = Sequelize.Op;
const { v4: uuidv4 } = require("uuid");

let t;
module.exports = {
  signup: async (createdBy, body) => {
    try {
      t = await tPostgres();
      let date = new Date(new Date() - 3600 * 1000 * 6).toISOString();
      const role = await Role.findOne(
        {
          attributes: ["id"],
          where: {
            hash: body.hash,
          },
        },
        { transaction: t }
      );

      delete body["hash"];
      body.createdBy = createdBy;
      body.created_at = date;
      body.updated_at = date;
      const data = Object.assign({ roleId: role.id }, body, { hash: uuidv4() });

      const userCreated = await User.create(data, { transaction: t });

      await t.commit();
      return userCreated;
    } catch (error) {
      await t.rollback();
      const reducer = (acc, ValidationErrorItem) =>
        `${acc} ${ValidationErrorItem.type}: ${ValidationErrorItem.message}\n`;
      const errorMessage = error.errors.reduce(reducer, "Errors: \n");
      throw new Error(errorMessage);
    }
  },

  findOneByUsername: (username) =>
    User.findOne({
      attributes: [
        "id",
        "username",
        "password",
        ["first_name", "firstName"],
        ["middle_name", "middleName"],
        ["last_name", "lastName"],
        "status",
      ],

      where: { username },
    }).then((data) => {
      return data;
    }),
  findOneByUsernameWithRolePermissions: (username) =>
    User.findOne({
      attributes: [
        "id",
        "username",
        "password",
        ["first_name", "firstName"],
        ["middle_name", "middleName"],
        ["last_name", "lastName"],
        "status",
      ],
      where: { username },
      include: [
        {
          model: Role,
          as: "roles",
          attributes: ["role"],
          where: { status: true },
          required: true,
          include: [
            {
              model: Permission,
              as: "permissions",
              attributes: ["permission"],
              where: { status: true },
              required: true,
            },
          ],
        },
      ],
    }).then((data) => {
      data.permissions = data.roles.permissions.map((permission) => {
        return permission.dataValues.permission;
      });
      data.role = data.roles.role;
      return data;
    }),

  getAll: () =>
    User.findAll({
      where: {
        status: true,
        username: {
          [notLike]: "admin",
        },
      },
      include: [
        {
          model: Role,
          as: "roles",
          attributes: ["role"],
          where: { status: true },
          required: true,
        },
      ],
    }).then((data) => {
      return data;
    }),

  getById: (hash) =>
    User.findOne({
      attributes: [
        ["role_id", "roleId"],
        "username",
        ["first_name", "firstName"],
        ["middle_name", "middleName"],
        ["last_name", "lastName"],
        "hash",
      ],
      where: { hash: hash },
      include: [
      {  model: Role,
        as: "roles",
        attributes: ["hash"],
        where: { status: true },
        required: true,}
      ],
      raw: true
      
    }).then((data) => {
      
  
      return data;
    }),
  update: async (
    hashUser,
    hashRole,
    username,
    password,
    firstName,
    middleName,
    lastName,
    updatedBy
  ) => {
    try {
      t = await tPostgres();
      const userUpdate = await User.findOne({
        where: { hash: hashUser },
      });
      const role = await Role.findOne(
        {
          attributes: ["id"],
          where: {
            hash: hashRole,
          },
        },
        { transaction: t }
      );
      const roleId = role.id;
       await User.update(
        { roleId, username, password, firstName, middleName, lastName,updatedBy },
        { where: { hash: hashUser } },
        { transaction: t }
      );
      await t.commit();
      return userUpdate;
    } catch (error) {
      await t.rollback();
      const reducer = (acc, ValidationErrorItem) =>
        `${acc} ${ValidationErrorItem.type}: ${ValidationErrorItem.message}\n`;
      const errorMessage = error.errors.reduce(reducer, "Errors: \n");
      throw new Error(errorMessage);
    }
  },

  deleteOne: async (hash) => {
    try {
      t = await tPostgres();
      const userDeleted = await User.findOne({
        where: { hash },
      });
       await User.update(
        { status: false },
        { where: { hash } },
        { transaction: t }
      );
      await t.commit();
      return userDeleted;
    } catch (error) {
      await t.rollback();
      const reducer = (acc, ValidationErrorItem) =>
        `${acc} ${ValidationErrorItem.type}: ${ValidationErrorItem.message}\n`;
      const errorMessage = error.errors.reduce(reducer, "Errors: \n");
      throw new Error(errorMessage);
    }
  },
  registerUserLogByUserID: async (userId, registerId, type, table, data) => {
    try {
      t = await tPostgres();
      Log.create({
        userId,
        registerId,
        type,
        table,
        data,
        created_at: new Date(new Date() - 3600 * 1000 * 6).toISOString(),
      }),
        await t.commit();
    } catch (error) {
      console.trace(error);
      await t.rollback();
      const reducer = (acc, ValidationErrorItem) =>
        `${acc} ${ValidationErrorItem.type}: ${ValidationErrorItem.message}\n`;
      const errorMessage = error.errors.reduce(reducer, "Errors: \n");
      throw new Error(errorMessage);
    }
  },
/*   getIdByUsername: (username) =>
    User.findOne({
      attributes: ["id"],
      where: { username },
    }).then((data) => {
      return data;
    }), */
  registerIpAndLastLogin: async (id, ipLogin) => {
    try {
      t = await tPostgres();

      let date = new Date(new Date() - 3600 * 1000 * 6).toISOString();

      await User.update(
        { ipLogin: ipLogin, lastLogin: date },
        {
          where: {
            id,
          },
        },
        {
          transaction: t,
        }
      );
      await t.commit();
    } catch (error) {
      await t.rollback();
      const reducer = (acc, ValidationErrorItem) =>
        `${acc} ${ValidationErrorItem.type}: ${ValidationErrorItem.message}\n`;
      const errorMessage = error.errors.reduce(reducer, "Errors: \n");
      throw new Error(errorMessage);
    }
  },
};
