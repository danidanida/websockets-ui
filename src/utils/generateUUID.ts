export function generateNumericID() {
  const timestamp = new Date().getTime();

  const randomComponent = Math.floor(Math.random() * 1000);

  const uniqueID = timestamp * 1000 + randomComponent;

  return uniqueID;
}