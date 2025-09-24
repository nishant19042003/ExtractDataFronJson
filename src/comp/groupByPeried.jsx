import { format, parseISO } from "date-fns";

function groupByPeriod(emails, period = "day") {
  const grouped = {};

  emails.forEach(email => {
    // assuming email.date is ISO string, adjust if different
    const date = parseISO(email.date);

    let key = "";
    if (period === "day") {
      key = format(date, "yyyy-MM-dd");   // e.g. 2025-09-24
    } else if (period === "week") {
      key = format(date, "yyyy-'W'II");   // e.g. 2025-W39
    } else if (period === "month") {
      key = format(date, "yyyy-MM");      // e.g. 2025-09
    }

    grouped[key] = (grouped[key] || 0) + email.amount;
  });

  return Object.entries(grouped).map(([key, amount]) => ({
    name: key,
    amount,
  }));
}
export default groupByPeriod;