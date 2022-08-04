/**
 * Role Service
 * @module src/services/RoleService
 * @name RoleService
 * @author Andrea Naraly Solis Martinez
 * @requires module:Role
 * @requires module:RoleHasPermission
 * @requires module:tPostgres
 */

const {
    User,
    Role,
    RoleHasPermission,
    tPostgres,
    Permission
} = require("../models/index.js");

 const { v4: uuidv4 } = require('uuid'); 

const roles_has_permissions = Role.belongsToMany(Permission, {
    through: RoleHasPermission,
    foreignKey: "roleId",
    otherKey: "permissionId"
});

const {
    Sequelize
  } = require('sequelize');
 const {gt, lte, ne, in: opIn,notLike} = Sequelize.Op;

let t;
module.exports = {

  /**
   * SERVICE
   * Create Role with permissions.
   * @async
   * @function
   * @name create
   * @description Create Role with permissions.
   * @param { module:Role.Role } body
   *    This param expect object Role.
   * @returns { Promise<module:Role.Role> } Role Created.
   * @throws Will throw an error if the database fails.
   */

    create: async (createdBy,body) => {
        try {
            t = await tPostgres();

            const roleCreated = await Role.create({
                role: body.roleName,
                createdBy:createdBy,
                hash: uuidv4(),
                include: [
                    {
                        association: RoleHasPermission
                    },
                ]
            }, {transaction: t});

            await t.commit();
            t = await tPostgres();
            await roleCreated.addPermission(body.permissionId, {
                through: {
                    selfGranted: false
                }
            }, {transaction: t});


            await t.commit();
            return roleCreated;
        } catch (error) {
            console.trace(error);
            await t.rollback();
            const reducer = (acc, ValidationErrorItem) => `${acc} ${
                ValidationErrorItem.type
            }: ${
                ValidationErrorItem.message
            }\n`;
            const errorMessage = error.errors.reduce(reducer, "Errors: \n");
            throw new Error(errorMessage);
        }
    },

    /**
   * SERVICE
   * Get All Roles.
   * @async
   * @function
   * @name getAll
   * @description Get All Roles.
   * @returns { Promise<Array<module:Role.Role>> } Roles.
   */
    getAll: async () => Role.findAll(
        {
            attributes:["role","hash","status"],
            where: {
            status: true,
            role: {
                [notLike]: 'ADMIN'
              }
            }
          
        }
    ),
     /**
   * SERVICE
   * Get Roles.
   * @async
   * @function
   * @name getAllByStatus
   * @description Get Roles by status.
   * @param {Number} status Roles status.
   * @returns { Promise<module:Role.Role> } - Roles.
   */
    getAllByStatus: (status) => Role.findAll(
        {
            attributes: [
                "id", "role","status"
            ],
            where: {
                status
            }
        }
    ).then((data) => {
        return data;
    }),
    
    /**
   * SERVICE
   * Get Role.
   * @async
   * @function
   * @name getById
   * @description Get Role by id.
   * @param {Number} id Role Id.
   * @returns { Promise<module:Role.Role> } - Role.
   */
          getById: async (hash) => Role.findAll(
        {
            attributes: [
                "id",
                [
                    "role", "roleName"
                ]
            ],
            where: {
                hash : hash
            }
        }
    ).then((data) => {
        return data;
    }),

    /**
   * SERVICE
   * Delete Role.
   * @async
   * @function
   * @name deleteOne
   * @description Delete Role.
   * @param {Number} id Role Id.
   * @returns {void}
   * @throws Will throw an error if the database fails.
   */
    deleteOne: async (hash) => {
        try {
            t = await tPostgres();
            const roleDeleted = await Role.findOne({
                where: { hash },
              });
             await Role.update({
                status: false
            }, {
                where: {
                    hash:hash
                }
            }, {transaction: t});
            await t.commit();
            return roleDeleted;
        } catch (error) {
            await t.rollback();
            const reducer = (acc, ValidationErrorItem) => `${acc} ${
                ValidationErrorItem.type
            }: ${
                ValidationErrorItem.message
            }\n`;
            const errorMessage = error.errors.reduce(reducer, "Errors: \n");
            throw new Error(errorMessage);
        }
    },
    
      /**
   * SERVICE
   * Update Role.
   * @async
   * @function
   * @name update
   * @description Update Role with permissions.
   * @param { module:Role.Role } body
   *   Role Object to update.
   * @param {Number} id - Role Id.
   * @returns {void}
   * @throws Will throw an error if the database fails.
   */
    update: async (hash, body, updatedBy) => {
        try {
            t = await tPostgres();

            let permissionsId = [];
            let index = 0;
            Object.entries(body.permissionId).forEach(([key, value]) => {
                
                if (value == true) {
                    permissionsId[index] = Number(key);
                    index++;
                }
            });

            await Role.update({
                role: body.roleName,
                updatedBy:updatedBy
            }, {
                where: {hash : hash}
            }, {transaction: t});

            const findRole = await Role.findOne({where: {hash:hash}});

            await findRole.setPermissions(permissionsId);
            await t.commit();

            return findRole;
        } catch (error) {
            console.trace(error);
            await t.rollback();
            const reducer = (acc, ValidationErrorItem) => `${acc} ${
                ValidationErrorItem.type
            }: ${
                ValidationErrorItem.message
            }\n`;
            const errorMessage = error.errors.reduce(reducer, "Errors: \n");
            throw new Error(errorMessage);
        }
    }
};
