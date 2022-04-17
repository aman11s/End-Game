const getMinMaxPrice = (product) => {
  const prices = product.map((item) => item.price);
  return { minPrice: Math.min(...prices), maxPrice: Math.max(...prices) };
};

export { getMinMaxPrice };
