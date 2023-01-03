const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)

module.exports = {
    createNoteSchema:  Joi.object({
        content: Joi.string().required(),
        important: Joi.boolean()
    }),
    getNoteSchema: {
        params: {
            id: Joi.objectId().required()
        }
    },
    updateNoteSchema: {
        params: {
            id: Joi.objectId().required()
        },
        body: {
            content: Joi.string().required(),
            important: Joi.boolean()
        }
    }
}