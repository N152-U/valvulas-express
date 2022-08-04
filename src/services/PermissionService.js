const { roleHasPermissions } = require("../middleware/index.js");
const {
  Permission,
  RoleHasPermission,
  Role,
  tMysql,
} = require("../models/index.js");

let t;

module.exports = {
  getAllByStatus: (status) => Permission.findAll({ where: { status: status } }),

  getAll: () =>
    Permission.findAll({ where: { status: true } }).then((data) => {
      return data;
    }),

  getAllByRoleID: (hash) => Role.findOne(
    {
        attributes: [
            "id"
        ],
        where: {
            hash : hash
        }
    }
  ).then(data => {
     return RoleHasPermission.findAll({
        attributes:["permissionId"],
        where: { roleId: data.id },
        raw: true,
      }
      ).then(accounts => accounts.map(RoleHasPermission => RoleHasPermission.permissionId)); 
  }),
};
