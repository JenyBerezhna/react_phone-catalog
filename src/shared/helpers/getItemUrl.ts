export const getItemUrl = (
  namespaceId: string,
  capacity: string,
  color: string,
) => {
  return `/item/${namespaceId}-${capacity}-${color}`;
};
