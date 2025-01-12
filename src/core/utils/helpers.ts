export const L = (...args: any) => {
  __DEV__ && console.log(...args);
};

export const priceFormater = (price: number | null | undefined) => {
  if (!price) return 0;
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const stringTruncate = (text: string, length: number) => {
  if (!text) return;
  if (!length || text.length <= length) return text || "";
  return `${text.substring(0, length)} ...`;
};

export const getContentType = (extension: string): string => {
  switch (extension) {
    case "mp4":
      return "video/mp4";
    case "jpeg":
    case "jpg":
      return "image/jpeg";
    case "png":
      return "image/png";
    default:
      return "application/octet-stream";
  }
};

export const formatNumberToDecimal = (num: number) => {
  // Check if the number has a decimal part
  if (num % 1 !== 0) {
    // Round to two decimal places if necessary
    return parseFloat(num.toFixed(2));
  } else {
    // Return the number as is if there are no decimals
    return num;
  }
};
