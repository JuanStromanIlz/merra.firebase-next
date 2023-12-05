export const slugify = (string = '', separator = '-') => {
  return string
    .toString() // Convert input to string (optional)
    .toLowerCase() // Convert the string to lowercase letters
    .normalize('NFD')
    .replace(
      /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
      '$1'
    )
    .normalize()
    .trim() // Remove whitespace from both sides of the string
    .replace(/\s+/g, separator)
    .replace(/\_/g, separator) // Replace underscore (_) with hyphen (-)
    .replace(/\-\-+/g, separator); // Replace multiple (-) with single (-)
};

export const firebaseDateParser = (date) =>
  new Date(date.seconds * 1000 + date.nanoseconds / 1000000);
