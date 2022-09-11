export default function transformISOToString(dateObj = {}) {
  let date = "";

  if ((dateObj as any).days) {
    date += (dateObj as any).days > 1 ? `${(dateObj as any).days} days ` : `${(dateObj as any).days} day `;
  }

  if ((dateObj as any).hours) {
    date += (dateObj as any).hours > 1 ? `${(dateObj as any).hours} hours ` : `${(dateObj as any).hours} hour `;
  }

  if ((dateObj as any).minutes) {
    date += (dateObj as any).minutes > 1 ? `${(dateObj as any).minutes} minutes ` : `${(dateObj as any).minutes} minute `;
  }

  if ((dateObj as any).seconds) {
    date += (dateObj as any).seconds > 1 ? `${(dateObj as any).seconds} seconds ` : `${(dateObj as any).seconds} second `;
  }

  return date.trim();
}
