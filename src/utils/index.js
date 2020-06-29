export const stringComparator = (a, b) => {
  const upperCaseA = a.toUpperCase();
  const upperCaseB = b.toUpperCase();
  return upperCaseA === upperCaseB ? 0 : upperCaseA > upperCaseB ? 1 : -1;
};
