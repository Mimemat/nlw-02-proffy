export const convertHourToMinutes = (time: string): number | void => {
  const regex = /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/;

  if (!regex.test(time)) return;

  const [hour, minutes] = time.split(':').map(Number);
  return hour * 60 + minutes;
};
