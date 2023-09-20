export const slugify = (string, separator = '-') => {
  return string
    .toString() // Convert input to string (optional)
    .toLowerCase() // Convert the string to lowercase letters
    .trim() // Remove whitespace from both sides of the string
    .replace(/\s+/g, separator) // Replace spaces with hyphen (-)
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\_/g, separator) // Replace underscore (_) with hyphen (-)
    .replace(/\-\-+/g, separator) // Replace multiple (-) with single (-)
    .replace(/\-$/g, ''); // Remove trailing (-)
};

export const firebaseDateParser = (date) =>
  new Date(date.seconds * 1000 + date.nanoseconds / 1000000);
