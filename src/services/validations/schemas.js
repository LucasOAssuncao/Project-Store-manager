const Joi = require('joi');

const saleSchema = Joi.object({
  productId: Joi.number().required().messages({
    'number.empty': '"productId" is required',
  }),
  quantity: Joi.number().greater(0).required()
.messages({
    'number.empty': '"quantity" is required',
    'number.greater': '"quantity" must be greater than or equal to 1',
  }),
});

module.exports = {
  saleSchema,
};