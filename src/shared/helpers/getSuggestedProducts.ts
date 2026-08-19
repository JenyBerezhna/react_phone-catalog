export const getSuggestedProducts = async (itemId: string) => {
  const response = await fetch(`/api/products/${itemId}/suggested`);

  return response.json();
};
