// export const startTimeFormatted = (startTime) => {
//   return new Date(`1970-01-01T${startTime}:00Z`);
// };

// export const endTimeFormatted = (endTime) => {
//   return new Date(`1970-01-01T${endTime}:00Z`);
// };

export const startTimeFormatted = (startTime) => {
  const [hours, minutes] = startTime.split(":");
  const date = new Date();
  date.setHours(hours, minutes, 0, 0); // Set local time
  return date.toISOString(); // Convert to UTC string
};

export const endTimeFormatted = (endTime) => {
  const [hours, minutes] = endTime.split(":");
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date.toISOString();
};
