export const formatDateData = (date: Date): string => {
  const formattedDate = date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    // second: '2-digit',
    hour12: true,
    timeZone: 'UTC',
  });
  return formattedDate;
};
