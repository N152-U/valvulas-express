const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
    createValve: celebrate({
        [Segments.BODY]: Joi
            .object()
            .keys({
                sectorId: Joi.number().allow(null).allow('').messages({
                    "number.base": `"Sector" debe ser numérico `,
                }),
                settlementId: Joi.number().required().messages({
                    "number.base": `"Colonia"  debe ser numérico`,
                    "number.empty": `"Colonia"  debe contener un valor`,
                    "any.required": `"Colonia" es un campo obligatorio`
                }),
                street: Joi.string().required().messages({
                    "string.base": `"Calle" debe ser una cadena de caracteres`,
                    "string.empty": `"Calle"  debe contener un valor`,
                    "any.required": `"Calle" es un campo obligatorio`
                }),
                corner: Joi.string().optional().allow(null).allow('').messages({
                    "string.base": `"Esquina" debe ser una cadena de caracteres`,
                }),
                btwFirstStreet: Joi.string().required().messages({
                    "string.base": `"Entre calle" debe ser una cadena de caracteres`,
                    "string.empty": `"Entre calle"  debe contener un valor`,
                    "any.required": `"Entre calle" es un campo obligatorio`
                }),
                btwSecondStreet: Joi.string().required().messages({
                    "string.base": `"Y calle" debe ser una cadena de caracteres`,
                    "string.empty": `"Y calle"  debe contener un valor`,
                    "any.required": `"Y calle" es un campo obligatorio`
                }),
                reference: Joi.string().optional().allow(null).allow('').messages({
                    "string.base": `"Referencia"  debe ser una cadena de caracteres`,
                }),
                diameter: Joi.number().required().messages({
                    "number.base": `"Diámetro"  debe ser de tipo numérico`,
                    "number.empty": `"Diámetro"  debe contener un valor`,
                    "any.required": `"Diámetro" es un campo obligatorio`
                }),
                valveLocationId: Joi.number().required().messages({
                    "number.base": `"Localización"  debe ser de tipo numérico`,
                    "number.empty": `"Localización"  debe contener un valor`,
                    "any.required": `"Localización" es un campo obligatorio`
                }),
                roadId: Joi.number().required().messages({
                    "number.base": `"Tipo de red"  debe ser de tipo numérico`,
                    "number.empty": `"Tipo de red"  debe contener un valor`,
                    "any.required": `"Tipo de red" es un campo obligatorio`
                }),
                valveType: Joi.string().required().messages({
                    "string.base": `"Tipo de válvula"  debe ser una cadena de caracteres`,
                    "string.empty": `"Tipo de válvula"  debe contener un valor`,
                    "any.required": `"Tipo de válvula" es un campo obligatorio`
                }),
                
                latitude: Joi.number().optional().allow(null).allow('').messages({
                    "number.base": `"Latitud" debe ser numérico `,
                }),
                longitude: Joi.number().optional().allow(null).allow('').messages({
                    "number.base": `"Longitud" debe ser numérico `,
                }),
                photo: Joi.object().optional().allow(null).allow('').messages({
                    "number.base": `"Foto" debe ser de tipo objeto `,
                }),
                directionClose: Joi.number().required().messages({
                    "number.base": `"Dirección de cierre"  debe ser de tipo numérico`,
                    "number.empty": `"Dirección de cierre"  debe contener un valor`,
                    "any.required": `"Dirección de cierre" es un campo obligatorio`
                }),
            }),
    }),
    createMovement: celebrate({
        [Segments.BODY]: Joi
            .object()
            .keys({
                valvesId: Joi.number().required().messages({
                    "number.base": `"Identificador de válvula"  debe ser de tipo numérico`,
                    "number.empty": `"Identificador de válvula"  debe contener un valor`,
                    "any.required": `"Identificador de válvula" es un campo obligatorio`
                }),
                action: Joi.number().required().messages({
                    "number.base": `"Apertura o Cierre"  debe ser de tipo numérico`,
                    "number.empty": `"Apertura o Cierre"  debe contener un valor`,
                    "any.required": `"Apertura o Cierre" es un campo obligatorio`
                }),
                reasonId: Joi.number().required().messages({
                    "number.base": `"Motivo"  debe ser de tipo numérico`,
                    "number.empty": `"Motivo"  debe contener un valor`,
                    "any.required": `"Motivo" es un campo obligatorio`
                }),
                otherReasons: Joi.string().optional().allow(null).allow('').messages({
                    "string.base": `"Otro motivo" debe ser una cadena de caracteres `,
                }),
                observation: Joi.string().optional().allow(null).allow('').messages({
                    "string.base": `"Observaciones" debe ser una cadena de caracteres `,
                }),
                turns: Joi.number().required().messages({
                    "number.base": `"Número de vueltas"  debe ser de tipo numérico`,
                    "number.empty": `"Número de vueltas"  debe contener un valor`,
                    "any.required": `"Número de vueltas" es un campo obligatorio`
                }),
                full: Joi.number().required().messages({
                    "number.base": `"Cerrado Completamente"  debe ser de tipo numérico`,
                    "number.empty": `"Cerrado Completamente"  debe contener un valor`,
                    "any.required": `"Cerrado Completamente" es un campo obligatorio`
                }),
            }),
    }),
    updateValve: celebrate({
        [Segments.BODY]: Joi
            .object()
            .keys({
                sectorId: Joi.number().allow(null).allow('').messages({
                    "number.base": `"Sector" debe ser numérico `,
                }),
                settlementId: Joi.number().required().messages({
                    "number.base": `"Colonia"  debe ser numérico`,
                    "number.empty": `"Colonia"  debe contener un valor`,
                    "any.required": `"Colonia" es un campo obligatorio`
                }),
                street: Joi.string().required().messages({
                    "string.base": `"Calle" debe ser una cadena de caracteres`,
                    "string.empty": `"Calle"  debe contener un valor`,
                    "any.required": `"Calle" es un campo obligatorio`
                }),
                corner: Joi.string().optional().allow(null).allow('').messages({
                    "string.base": `"Esquina" debe ser una cadena de caracteres`,
                }),
                btwFirstStreet: Joi.string().required().messages({
                    "string.base": `"Entre calle" debe ser una cadena de caracteres`,
                    "string.empty": `"Entre calle"  debe contener un valor`,
                    "any.required": `"Entre calle" es un campo obligatorio`
                }),
                btwSecondStreet: Joi.string().required().messages({
                    "string.base": `"Y calle" debe ser una cadena de caracteres`,
                    "string.empty": `"Y calle"  debe contener un valor`,
                    "any.required": `"Y calle" es un campo obligatorio`
                }),
                reference: Joi.string().optional().allow(null).allow('').messages({
                    "string.base": `"Referencia"  debe ser una cadena de caracteres`,
                }),
                diameter: Joi.number().required().messages({
                    "number.base": `"Diámetro"  debe ser de tipo numérico`,
                    "number.empty": `"Diámetro"  debe contener un valor`,
                    "any.required": `"Diámetro" es un campo obligatorio`
                }),
                valveLocationId: Joi.number().required().messages({
                    "number.base": `"Localización"  debe ser de tipo numérico`,
                    "number.empty": `"Localización"  debe contener un valor`,
                    "any.required": `"Localización" es un campo obligatorio`
                }),
                roadId: Joi.number().required().messages({
                    "number.base": `"Tipo de red"  debe ser de tipo numérico`,
                    "number.empty": `"Tipo de red"  debe contener un valor`,
                    "any.required": `"Tipo de red" es un campo obligatorio`
                }),
                valveType: Joi.string().required().messages({
                    "string.base": `"Tipo de válvula"  debe ser una cadena de caracteres`,
                    "string.empty": `"Tipo de válvula"  debe contener un valor`,
                    "any.required": `"Tipo de válvula" es un campo obligatorio`
                }),
                
                latitude: Joi.number().optional().allow(null).allow('').messages({
                    "number.base": `"Latitud" debe ser numérico `,
                }),
                longitude: Joi.number().optional().allow(null).allow('').messages({
                    "number.base": `"Longitud" debe ser numérico `,
                }),
                photo: Joi.object().optional().allow(null).allow('').messages({
                    "number.base": `"Foto" debe ser de tipo objeto `,
                }),
                directionClose: Joi.number().required().messages({
                    "number.base": `"Dirección de cierre"  debe ser de tipo numérico`,
                    "number.empty": `"Dirección de cierre"  debe contener un valor`,
                    "any.required": `"Dirección de cierre" es un campo obligatorio`
                }),
            }),
    }),
    updateMovement: celebrate({
        [Segments.BODY]: Joi
            .object()
            .keys({
                valvesId: Joi.number().required().messages({
                    "number.base": `"Identificador de válvula"  debe ser de tipo numérico`,
                    "number.empty": `"Identificador de válvula"  debe contener un valor`,
                    "any.required": `"Identificador de válvula" es un campo obligatorio`
                }),
                action: Joi.number().required().messages({
                    "number.base": `"Apertura o Cierre"  debe ser de tipo numérico`,
                    "number.empty": `"Apertura o Cierre"  debe contener un valor`,
                    "any.required": `"Apertura o Cierre" es un campo obligatorio`
                }),
                reasonId: Joi.number().required().messages({
                    "number.base": `"Motivo"  debe ser de tipo numérico`,
                    "number.empty": `"Motivo"  debe contener un valor`,
                    "any.required": `"Motivo" es un campo obligatorio`
                }),
                otherReasons: Joi.string().optional().allow(null).allow('').messages({
                    "string.base": `"Otro motivo" debe ser una cadena de caracteres `,
                }),
                observation: Joi.string().optional().allow(null).allow('').messages({
                    "string.base": `"Observaciones" debe ser una cadena de caracteres `,
                }),
                turns: Joi.number().required().messages({
                    "number.base": `"Número de vueltas"  debe ser de tipo numérico`,
                    "number.empty": `"Número de vueltas"  debe contener un valor`,
                    "any.required": `"Número de vueltas" es un campo obligatorio`
                }),
                full: Joi.number().required().messages({
                    "number.base": `"Cerrado Completamente"  debe ser de tipo numérico`,
                    "number.empty": `"Cerrado Completamente"  debe contener un valor`,
                    "any.required": `"Cerrado Completamente" es un campo obligatorio`
                }),
            }),
    }),
    getBetweenDatesMovements: celebrate({
        [Segments.QUERY]: Joi
            .object()
            .keys({
                startDate: Joi.date().required().messages({
                    "date.base": `"Fecha de inicio"  debe ser de tipo numérico`,
                    "date.empty": `"Fecha de inicio"  debe contener un valor`,
                    "any.required": `"Fecha de inicio" es un campo obligatorio`
                }),
                endDate: Joi.date().required().messages({
                    "date.base": `"Fecha de termino"  debe ser de tipo numérico`,
                    "date.empty": `"Fecha de termino"  debe contener un valor`,
                    "any.required": `"Fecha de termino" es un campo obligatorio`
                }), 
            }),
    }),

};