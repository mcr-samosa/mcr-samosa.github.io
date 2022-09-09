export const richTextHasContent = (input: string): boolean => {
  const regex = /(<([^>]+)>)/gi;
  return !!input.replace(regex, "").trim().length;
};
