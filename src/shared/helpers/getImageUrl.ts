export const getImageUrl = (image: string) => {
  return `${import.meta.env.BASE_URL}${image.replace(/^\/+/, '')}`;
};
