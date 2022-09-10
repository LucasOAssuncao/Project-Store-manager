const validateProduct = (arr) => {
  if (arr.some(({ productId }) => !productId)) {
    return { message: '"productId" is required' };
  }
  
  if (arr.some(({ quantity }) => quantity <= 0)) {
    return { message: '"quantity" must be greater than or equal to 1' };
  }
  
  if (arr.some(({ quantity }) => !quantity)) {
    return { message: '"quantity" is required' };
  }

  return { message: '' };
};

module.exports = {
  validateProduct,
};
