export const getSuggestedProducts = async (productId: string) => {
  const response = await fetch(`/api/products/${productId}/suggested`);

  return response.json();
};
