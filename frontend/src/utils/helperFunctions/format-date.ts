import dayjs from "dayjs";

export function formatDate(
  date?: Date,
  format: string = "DD MMM, YYYY"
): string {
  if (!date) return "";
  // return dayjs(date).format(format);
  // if date is today return 'Today' else if date is yesterday return 'Yesterday' else return the formatted date
  const today = dayjs();
  const day = dayjs(date);
  if (today.isSame(day, "day")) {
    if (format === "MMMM D, YYYY") {
      return "Today";
    }
    if (format === "h:mm A") {
      return day.format(format);
    }
  }
  if (today.subtract(1, "day").isSame(day, "day")) {
    if (format === "MMMM D, YYYY") {
      return "Yesterday";
    }
    if (format === "h:mm A") {
      return day.format(format);
    }
  }

  for (let index = 2; index < 7; index++) {
    if (today.subtract(index, "day").isSame(day, "day")) {
      if (format === "MMMM D, YYYY") {
        return day.format("dddd");
      }
      if (format === "h:mm A") {
        return day.format(format);
      }
    }
  }

  return day.format(format);
}
