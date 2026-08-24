export const getImageUrl = (image: string) => {
  return image.startsWith('/') ? image : `/${image}`;
};
