export function toLocalDatetimeInput(dateString) {
  const date = new Date(dateString);
  const tzOffset = date.getTimezoneOffset() * 60000; // in ms
  const localISOTime = new Date(date - tzOffset).toISOString().slice(0, 16);
  return localISOTime;
}