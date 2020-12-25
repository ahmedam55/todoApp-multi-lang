export const replaceEnWithArNumbers = (str = '') => {
  return str.replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]);
};