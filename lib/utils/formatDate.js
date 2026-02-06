export function formatDate(date, locale = "en-GB") {
  const d = new Date(date);

  return d.toLocaleDateString(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
