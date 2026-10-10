export const getImageUrl = (image: string) => {
  const cleanImage = image.startsWith('/') ? image.slice(1) : image;

  return `${import.meta.env.BASE_URL}${cleanImage}`;
};
