export const useFormatDate = (date: string, seperator: `/` | `.` = `/`, getTime:boolean) => {
  const dateString = new Date(date).toISOString();
  const justDate = new Date(dateString).toLocaleDateString().split(`.`).join(seperator);
  const justTime = new Date(dateString).toLocaleTimeString().slice(0, 5);

  if (getTime) {
    return `${justDate} ${justTime}`;

  } else {
    return justDate
  }
};
