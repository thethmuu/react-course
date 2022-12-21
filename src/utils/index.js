export function slugify(str) {
  return str.toLowerCase().split(' ').join('-');
}
