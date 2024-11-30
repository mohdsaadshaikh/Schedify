export const extractPublicId = (url) => {
  const match = url.match(/\/image\/upload\/[^/]+\/(.+)\./);
  return match ? match[1] : null;
};
