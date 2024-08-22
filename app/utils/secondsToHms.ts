const SECONDS_PER_DAY = 86400;
const HOURS_PER_DAY = 24;

export function secondsToHms(seconds: number) {
  const days = Math.floor(seconds / SECONDS_PER_DAY);
  const remainderSeconds = seconds % SECONDS_PER_DAY;
  const lessThanHour = remainderSeconds < 3600;
  const hms = new Date(remainderSeconds * 1000)
    .toISOString()
    .substring(lessThanHour ? 14 : 11, 19);

  return hms.replace(/^(\d+)/, (h) =>
    `${Number(h) + days * HOURS_PER_DAY}`.padStart(2, "0")
  );
}
