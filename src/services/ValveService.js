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
  Municipality,
  Settlement,
  Sector,
  Valve,
  ValveType,
  ValveMovement,
  OtherReason,
  User,
  Diameter,
  ValveLocation,
  Reason,
  Road,
  Photo,
  tPostgres,
} = require("../models/index.js");

const { Sequelize } = require("sequelize");

const { Op } = require("sequelize");

let t;
module.exports = {
  createValve: async (createdBy, body) => {
    try {
      t = await tPostgres();

      body.createdBy = createdBy;
      body.created_at = new Date(new Date() - 3600 * 1000 * 6).toISOString();
      const valveTypeExists = await ValveType.findOne(
        {
          attributes: ["id"],
          where: {
            type: body.valveType.toUpperCase(),
          },
        },
        { transaction: t }
      );
      if (valveTypeExists == null) {
        const valveType = await ValveType.create(
          {
            created_at: new Date(new Date() - 3600 * 1000 * 6).toISOString(),
            type: body.valveType,
            createdBy: body.createdBy,
          },
          { transaction: t }
        );
        body.valveTypeId = valveType.id;
      } else {
        body.valveTypeId = valveTypeExists.id;
      }
      
      const diameterExists = await Diameter.findOne(
        {
          attributes: ["id"],
          where: {
            diameter: body.diameter,
          },
        },
        { transaction: t }
      );
     

      if (diameterExists == null) {
        const diameter = await Diameter.create(
          {
            created_at: new Date(new Date() - 3600 * 1000 * 6).toISOString(),
            diameter: body.diameter,
            createdBy: body.createdBy,
          },
          { transaction: t }
        );
   
        body.diameterId = diameter.id;
      } else {
        body.diameterId = diameterExists.id;
      }

      delete body["valveType"];
      delete body["diameter"];

      const ValveCreated = await Valve.create(
        {
          ...body,
        },
        {
          transaction: t,
        }
      );

      await t.commit();
      return ValveCreated;
    } catch (error) {
      console.trace(error);
      await t.rollback();
      const reducer = (acc, ValidationErrorItem) =>
        `${acc} ${ValidationErrorItem.type}: ${ValidationErrorItem.message}\n`;
      const errorMessage = error.errors.reduce(reducer, "Errors: \n");
      throw new Error(errorMessage);
    }
  },
  
 
  uploadPhotos: async (createdBy, valveId, body) => {
    try {
      t = await tPostgres();
      const { fileName, fileType, data } = body.photo;
      const PhotoUploaded = Photo.create({
        fileName,
        fileType,
        data,
        createdBy,
        valveId,
        created_at: new Date(new Date() - 3600 * 1000 * 6).toISOString(),
      });

      return PhotoUploaded;
    } catch (error) {
      console.trace(error);
      await t.rollback();
      const reducer = (acc, ValidationErrorItem) =>
        `${acc} ${ValidationErrorItem.type}: ${ValidationErrorItem.message}\n`;
      const errorMessage = error.errors.reduce(reducer, "Errors: \n");
      throw new Error(errorMessage);
    }
  },
  updatePhotos: async (updatedBy, valveId, body) => {
    try {
      t = await tPostgres();
      const dataUpdatePhoto = await Photo.findOne({ where: { valveId } });
      const { fileName, fileType, data } = body.photo;
      if (!dataUpdatePhoto) {
        const PhotoUploaded = await require("./ValveService").uploadPhotos(
          updatedBy,
          valveId,
          body
        );
        return PhotoUploaded;
      }

      const PhotoUploaded = await Photo.update(
        {
          fileName,
          fileType,
          data,
          updatedBy,
          updated_at: new Date(new Date() - 3600 * 1000 * 6).toISOString(),
        },
        {
          where: {
            valve_id: valveId,
          },
        },
        {
          transaction: t,
        }
      );

      return PhotoUploaded;
    } catch (error) {
      console.trace(error);
      await t.rollback();
      const reducer = (acc, ValidationErrorItem) =>
        `${acc} ${ValidationErrorItem.type}: ${ValidationErrorItem.message}\n`;
      const errorMessage = error.errors.reduce(reducer, "Errors: \n");
      throw new Error(errorMessage);
    }
  },
  createValveMovement: async (createdBy, body) => {
    try {
      t = await tPostgres();

      body.createdBy = createdBy;
      body.created_at = new Date(new Date() - 3600 * 1000 * 6).toISOString();

      /* if (body.reasonId == 4) {
        const reasonExists = await OtherReason.findOne(
          {
            attributes: ["id"],
            where: {
              reason: body.OtherReason.toUpperCase(),
            },
          },
          { transaction: t }
        );

        if (reasonExists == null) {
          const otherReason = await OtherReason.create(
            {
              created_at: new Date(new Date() - 3600 * 1000 * 6).toISOString(),
              reason: body.OtherReason,
              createdBy: body.createdBy,
            },
            { transaction: t }
          );
          body.otherReasons = otherReason.id;
        } else {
          body.otherReasons = reasonExists.id;
        }
      } else {
        body.otherReasons = null;
      } */

      const ValveMovementCreated = await ValveMovement.create(
        {
          ...body,
        },
        {
          transaction: t,
        }
      );

      await t.commit();
      return ValveMovementCreated;
    } catch (error) {
      console.trace(error);
      await t.rollback();
      const reducer = (acc, ValidationErrorItem) =>
        `${acc} ${ValidationErrorItem.type}: ${ValidationErrorItem.message}\n`;
      const errorMessage = error.errors.reduce(reducer, "Errors: \n");
      throw new Error(errorMessage);
    }
  },

  /**
   * SERVICE
   * Delete Valve.
   * @async
   * @function
   * @name deleteOne
   * @description Delete Valve.
   * @param {Number} id Valve Id.
   * @returns {void}
   * @throws Will throw an error if the database fails.
   */
  deleteOneValve: async (id) => {
    try {
      t = await tPostgres();

      const countMovements = await ValveMovement.count({
        where: { valvesId: id },
      });

      if (countMovements == 0) {
        const dataValveDeleted = await Valve.findOne({ where: { id } });
        await Valve.update(
          {
            status: false,
            updated_at: new Date(new Date() - 3600 * 1000 * 6).toISOString(),
          },
          {
            where: {
              id,
            },
          },
          { transaction: t }
        );
        await t.commit();
        return dataValveDeleted;
      }
    } catch (error) {
      await t.rollback();
      const reducer = (acc, ValidationErrorItem) =>
        `${acc} ${ValidationErrorItem.type}: ${ValidationErrorItem.message}\n`;
      const errorMessage = error.errors.reduce(reducer, "Errors: \n");
      throw new Error(errorMessage);
    }
  },
  deleteOneValveMovement: async (id) => {
    try {
      t = await tPostgres();
      const dataValveMovementDeleted = await ValveMovement.findOne({
        where: { id },
      });

      await ValveMovement.update(
        {
          status: false,
          updated_at: new Date(new Date() - 3600 * 1000 * 6).toISOString(),
        },
        {
          where: {
            id,
          },
        },
        { transaction: t }
      );
      await t.commit();
      return dataValveMovementDeleted;
    } catch (error) {
      await t.rollback();
      const reducer = (acc, ValidationErrorItem) =>
        `${acc} ${ValidationErrorItem.type}: ${ValidationErrorItem.message}\n`;
      const errorMessage = error.errors.reduce(reducer, "Errors: \n");
      throw new Error(errorMessage);
    }
  },

  getTotalCount: (
    offset,
    limit,
    municipality,
    settlement,
    street,
    createdAt,
    sector
  ) => {
    whereMunicipality = { active: true };
    if (municipality) {
      whereMunicipality.municipality = {
        [Op.iLike]: `%${municipality}%`,
      };
    }
    whereSettlement = { active: true };
    if (settlement) {
      whereSettlement.settlement = {
        [Op.iLike]: `%${settlement}%`,
      };
    }
    whereSector = {};
    if (sector) {
      whereSector.cve_sec = {
        [Op.iLike]: `%${sector}%`,
      };
    }

    whereStreetCreatedAt = { status: true };
    if (street) {
      whereStreetCreatedAt.street = {
        [Op.iLike]: `%${street}%`,
      };
    }
    if (createdAt) {
      whereStreetCreatedAt.createdAt = Sequelize.where(
        Sequelize.cast(Sequelize.col("valves.created_at"), "varchar"),
        {
          [Op.like]: `${createdAt}%`,
        }
      );
    }
    return Valve.count({
      where: whereStreetCreatedAt,
      include: [
        {
          model: Settlement,
          as: "settlement",
          attributes: ["settlement"],
          include: [
            {
              model: Municipality,
              as: "settlement_municipality",
              attributes: ["municipality"],
              where: whereMunicipality,
            },
          ],
          where: whereSettlement,
        },
        {
          model: Diameter,
          as: "diameter",
          attributes: ["diameter"],
        },
        {
          model: Sector,
          as: "sector",
          attributes: ["cve_sec"],
          where: whereSector,
          required: false
        },
        {
          model: ValveType,
          attributes: ["type"],
        },
        {
          model: ValveLocation,
          attributes: ["location"],
        },
        {
          model: Road,
          attributes: ["type"],
        },
      ],
      offset: offset,
      limit: limit,
    }).then((data) => {
      return data;
    });
  },
  getTotalCountDaily: (
    newDate,offset, limit,valveId,sector,status,reason,action
  ) => {
    whereValveMovement = { status: true,
      created_at: {
        [Op.gte]: `%${newDate}`,
      }, };
    whereValveId = {status:true}
    valveId = Number(valveId);
    if (valveId) {
      whereValveId.id = {
        [Op.eq]:valveId
      };
    }
    whereSector = {  };
    if (sector) {
    whereSector.cve_sec = {
      [Op.iLike]: `%${sector}%`,
    };
  }
  whereReason = { status: true };
    if (reason) {
      whereReason.id = {
        [Op.eq]:reason
    };
  }
  if (action) {
    whereValveMovement.action = {
      [Op.eq]:action
  };
}
if (status) {
  whereValveMovement.full = {
    [Op.eq]:status
};
}

    return ValveMovement.count({
      attributes: [
      ],

      where: whereValveMovement,

      include: [
        {
          model: Reason,
          attributes: [],
          where:whereReason
        },
        {
          model: User,
          as: "creator",
          attributes: [],
        },
        {
          model: User,
          as: "updator",
          attributes: [],
        },
        {
          model: Valve,
          attributes: [],
          where:whereValveId,
          include: [
            {
              model: Sector,
              as: "sector",
              attributes: [],
              where: whereSector
            },
          ],
        },
      ],
      offset: offset,
      limit: limit,
    }).then((data) => {
      return data;
    });
  },

  getTotalCountMovement: (id, offset, limit, createdAt) => {
    whereCreatedAt = { status: true, valves_id: id };
    if (createdAt) {
      whereCreatedAt.createdAt = Sequelize.where(
        Sequelize.cast(Sequelize.col("valves_movements.created_at"), "varchar"),
        {
          [Op.like]: `${createdAt}%`,
        }
      );
    }
    return ValveMovement.count({
      where: whereCreatedAt,
      include: [
        {
          model: User,
          as: "creator",
          attributes: ["username"],
        },
        {
          model: User,
          as: "updator",
          attributes: ["username"],
        },
        {
          model: Reason,
          attributes: ["reason"],
        },
      ],
      offset: offset,
      limit: limit,
    }).then((data) => {
      return data;
    });
  },

  /**
   * SERVICE
   * Get All Valves.
   * @async
   * @function
   * @name getAllValves
   * @description Get Valves.
   * @returns { Promise<module:Valve.Valve> } - Valves.
   */
  getAllValves: (
    offset,
    limit,
    municipality,
    settlement,
    street,
    createdAt,
    sector
  ) => {
    whereMunicipality = { active: true };
    if (municipality) {
      whereMunicipality.municipality = {
        [Op.iLike]: `%${municipality}%`,
      };
    }
    whereSector = {};
    if (sector) {
      whereSector.cve_sec = {
        [Op.iLike]: `%${sector}%`,
      };
    }
    whereSettlement = { active: true };
    if (settlement) {
      whereSettlement.settlement = {
        [Op.iLike]: `%${settlement}%`,
      };
    }
    whereStreetCreatedAt = { status: true };
    if (street) {
      whereStreetCreatedAt.street = {
        [Op.iLike]: `%${street}%`,
      };
    }
    if (createdAt) {
      whereStreetCreatedAt.createdAt = Sequelize.where(
        Sequelize.cast(Sequelize.col("valves.created_at"), "varchar"),
        {
          [Op.like]: `${createdAt}%`,
        }
      );
    }

    return Valve.findAll({
      attributes: [
        "id",
        "street",
        "corner",
        "btwFirstStreet",
        "btwSecondStreet",
        "reference",
        "latitude",
        "longitude",
        [
          Sequelize.fn(
            "to_date",
            Sequelize.cast(Sequelize.col("valves.created_at"), "varchar"),
            "YYYY MM DD"
          ),
          "createAtnew",
        ],

      ],

      where: whereStreetCreatedAt,
      include: [
        {
          model: Settlement,
          as: "settlement",
          attributes: ["settlement"],
          include: [
            {
              model: Municipality,
              as: "settlement_municipality",
              attributes: ["municipality"],
              where: whereMunicipality,
            },
          ],
          where: whereSettlement,
        },
        {
          model: Diameter,
          as: "diameter",
          attributes: ["diameter"],
        },
        {
          model: Sector,
          as: "sector",
          attributes: ["cve_sec"],
          where: whereSector,
          required: false
        },
        {
          model: ValveType,
          attributes: ["type"],
        },
        {
          model: ValveLocation,
          attributes: ["location"],
        },
        {
          model: Road,
          attributes: ["type"],
        },
       
        /* {
          model: Photo,
          attributes: ["data"],
        }, */
      ],
      offset: offset,
      limit: limit,
    }).then((data) => {
     
      return Promise.all(
        data.map(async(valve)=>
          {
            try {
              valve.dataValues.count = await (
                await ValveMovement.count({
                   where: {
                    valvesId: valve.dataValues.id
                  } 
                }
                )
              )
              return await valve;
            } catch (e) {
              return e.toString();
            }
            
          }
        )
      ).then((data)=>{
          return data;
      }
      )
    
    });
  },

  getByIdValveMovements: (id, offset, limit, createdAt) => {
    whereCreatedAt = { status: true, valves_id: id };
    if (createdAt) {
      whereCreatedAt.createdAt = Sequelize.where(
        Sequelize.cast(Sequelize.col("valves_movements.created_at"), "varchar"),
        {
          [Op.like]: `${createdAt}%`,
        }
      );
    }
    return ValveMovement.findAll({
      attributes: [
        "id",
        "valves_id",
        "reasons_id",
        "observation",
        "action",
        "turns",
        "full",
        ["other_reasons", "otherReasons"],
        [
          Sequelize.fn(
            "to_date",
            Sequelize.cast(
              Sequelize.col("valves_movements.created_at"),
              "varchar"
            ),
            "YYYY MM DD"
          ),
          "createAtnew",
        ],
      ],

      where: whereCreatedAt,

      include: [
        {
          model: User,
          as: "creator",
          attributes: ["username"],
        },
        {
          model: User,
          as: "updator",
          attributes: ["username"],
        },
        {
          model: Reason,
          attributes: ["reason"],
        },
      ],
      offset: offset,
      limit: limit,
    }).then((data) => {
      return data;
    });
  },

  getBetweenDatesMovements: (startDate, endDate) =>
    ValveMovement.findAll({
      attributes: [
        "valves_id",
        "reasons_id",
        "observation",
        "action",
        "turns",
        "full",
        ["other_reasons", "otherReasons"],
        [
          Sequelize.fn(
            "to_date",
            Sequelize.cast(
              Sequelize.col("valves_movements.created_at"),
              "varchar"
            ),
            "YYYY MM DD"
          ),
          "date",
        ],
        "created_at",
      ],

      where: {
        created_at: {
          [Op.between]: [startDate, endDate],
        },
      },
    }).then((data) => {
      return data;
    }),

  getByIdMovement: (id) =>
    ValveMovement.findOne({
      attributes: [
        "id",
        "valves_id",
        "reasons_id",
        "observation",
        "action",
        "turns",
        "full",
        ["other_reasons", "otherReasons"],
        [
          Sequelize.fn(
            "to_date",
            Sequelize.cast(
              Sequelize.col("valves_movements.created_at"),
              "varchar"
            ),
            "YYYY MM DD"
          ),
          "createAtnew",
        ],
      ],

      where: {
        id,
        status: true,
      },
      include: [
        {
          model: Reason,

          attributes: ["reason", "id"],
        },
      ],
    }).then((data) => {
      return data;
    }),

  /**
   * SERVICE
   * Update Valve.
   * @async
   * @function
   * @name update
   * @description Update Valve.
   * @param { module:Valve.Valve } body
   *   Valve Object to update.
   * @param {Number} id - Valve Id.
   * @returns {void}
   * @throws Will throw an error if the database fails.
   */
  updateValve: async (id, body, createdBy) => {
    try {
      t = await tPostgres();

      const dataValveUpdated = await Valve.findOne(
        { where: { id } },
        { transaction: t }
      );
      body.updatedBy = createdBy;
      body.updated_at = new Date(new Date() - 3600 * 1000 * 6).toISOString();
      const valveTypeExists = await ValveType.findOne(
        {
          attributes: ["id"],
          where: {
            type: body.valveType.toUpperCase(),
          },
        },
        { transaction: t }
      );

      if (valveTypeExists == null) {
        const valveType = await ValveType.create(
          {
            created_at: new Date(new Date() - 3600 * 1000 * 6).toISOString(),
            type: body.valveType,
            createdBy: createdBy,
          },
          { transaction: t }
        );
        body.valveTypeId = valveType.id;
      } else {
        body.valveTypeId = valveTypeExists.id;
      }
      const diameterExists = await Diameter.findOne(
        {
          attributes: ["id"],
          where: {
            diameter: body.diameter,
          },
        },
        { transaction: t }
      );
      if (diameterExists == null) {
        const diameter = await Diameter.create(
          {
            created_at: new Date(new Date() - 3600 * 1000 * 6).toISOString(),
            diameter: body.diameter,
            createdBy: createdBy,
          },
          { transaction: t }
        );
   
        body.diameterId = diameter.id;
      } else {
        body.diameterId = diameterExists.id;
      }
      delete body["valveType"];
      delete body["diameter"];

      console.log("\n\n\nHOLA\n\n\n", body);
      t.afterCommit(async () => {
        await Valve.update(
          body,
          {
            where: {
              id,
            },
          },
          {
            transaction: t,
          }
        );
      });
      
      await t.commit();
      return dataValveUpdated;
    } catch (error) {
      await t.rollback();
      /* const reducer = (acc, ValidationErrorItem) =>
        `${acc} ${ValidationErrorItem.type}: ${ValidationErrorItem.message}\n`;
      const errorMessage = error.errors.reduce(reducer, "Errors: \n");
      throw new Error(errorMessage);
    } */
      console.log(error);
      return error;
    }
  },
  updateValveMovement: async (id, body, createdBy) => {
    try {
      t = await tPostgres();
      const dataValveMovementUpdated = await ValveMovement.findOne({
        where: { id },
      });
      let date = new Date(new Date() - 3600 * 1000 * 6).toISOString();
      body.updatedBy = createdBy;
      body.updated_at = date;

      /* if (body.reasonId == 4) {
        const reasonExists = await OtherReason.findOne(
          {
            attributes: ["id"],
            where: {
              reason: body.OtherReasons.toUpperCase(),
            },
          },
          { transaction: t }
        );

        if (reasonExists == null) {
          const otherReasons = await OtherReason.create(
            {
              created_at: date,
              reason: body.OtherReason,
              createdBy,
            },
            { transaction: t }
          );
          body.otherReasons = otherReasons.id;
        } else {
          body.otherReasons = reasonExists.id;
        }
      } else {
        body.otherReasons = null;
      } */

      await ValveMovement.update(
        body,

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
      return dataValveMovementUpdated;
    } catch (error) {
      await t.rollback();
      const reducer = (acc, ValidationErrorItem) =>
        `${acc} ${ValidationErrorItem.type}: ${ValidationErrorItem.message}\n`;
      const errorMessage = error.errors.reduce(reducer, "Errors: \n");
      throw new Error(errorMessage);
    }
  },
  getOtherReason: (value) =>
    OtherReason.findOne({
      attributes: ["reason"],
      where: {
        id: value.other_reasons,
      },
    }).then((data) => {
      return data;
    }),
  getByIdValve: (id) =>
    Valve.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Settlement,
          as: "settlement",
          attributes: ["municipality_id", "id"],
        },
        {
          model: Road,
          as: "road",
          attributes: ["type", "id"],
        },
        {
          model: ValveLocation,

          attributes: ["location", "id"],
        },
        {
          model: Diameter,

          attributes: ["diameter", "id"],
        },
        {
          model: ValveType,

          attributes: ["type"],
        },
        {
          model: Photo,
          attributes: ["data"],
        },
      ],
    }).then((data) => {
      return data;
    }),
  getByTodayValvesMovement: (newDate,offset, limit,valveId,sector,status,reason,action) =>{
 
      whereValveMovement = { status: true,
        created_at: {
          [Op.gte]: `%${newDate}`,
        }, };
      whereValveId = {status:true}
      valveId = Number(valveId);
      if (valveId) {
        whereValveId.id = {
          [Op.eq]:valveId
        };
      }
      whereSector = {  };
      if (sector) {
      whereSector.cve_sec = {
        [Op.iLike]: `%${sector}%`,
      };
    }
    whereReason = { status: true };
      if (reason) {
        whereReason.id = {
          [Op.eq]:reason
      };
    }
    
    if (action) {
      whereValveMovement.action = {
        [Op.eq]:action
    };
  }
  if (status) {
    whereValveMovement.full = {
      [Op.eq]:status
  };
}


      return ValveMovement.findAll({
        attributes: [
          "id",
          "valves_id",
          "observation",
          "action",
          "turns",
          "full",
          ["other_reasons", "otherReasons"],
        ],
  
        where: whereValveMovement,
  
        include: [
          {
            model: Reason,
            attributes: ["reason"],
            where: whereReason
          },
          {
            model: User,
            as: "creator",
            attributes: ["username"],
          },
          {
            model: User,
            as: "updator",
            attributes: ["username"],
          },
          {
            model: Valve,
            attributes: [],
            where: whereValveId,
            include: [
              {
                model: Sector,
                as: "sector",
                attributes: ["cve_sec"],
                where: whereSector
              },
            ],
          },
        ],
        offset: offset,
        limit: limit,
        raw: true,
      }).then((data) => {
        return data;
      });
    },
   
  detailGetByIdValve: (id) =>
    Valve.findOne({
      attributes: [
        "id",
        "street",
        "corner",
        "btwFirstStreet",
        "btwSecondStreet",
        "reference",
        "latitude",
        "longitude",
        "directionClose",
      ],
      where: {
        id,
      },
      include: [
        {
          model: Settlement,
          as: "settlement",
          attributes: ["settlement"],
          include: [
            {
              model: Municipality,
              as: "settlement_municipality",
              attributes: ["municipality"],
            },
          ],
        },
        {
          model: Diameter,
          as: "diameter",
          attributes: ["diameter", "id"],
        },
        {
          model: Sector,
          as: "sector",
          attributes: ["cve_sec"],
        },
        {
          model: ValveType,
          attributes: ["type"],
        },
        {
          model: ValveLocation,
          attributes: ["location"],
        },
        {
          model: Road,
          attributes: ["type"],
        },
        {
          model: Photo,
          attributes: ["data"],
        },
      ],
      raw: true,
    }).then((data) => {

      return data;
    }),
};
