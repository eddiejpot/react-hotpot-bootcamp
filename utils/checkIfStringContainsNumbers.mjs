export default function checkIfStringContainsNumbers(str) {
  const regexp = /\d/g;
  return regexp.test(str);
}
