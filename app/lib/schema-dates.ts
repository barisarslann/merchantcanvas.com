// Editorial sources store calendar dates, not exact publication timestamps.
// Normalize to the start of the publisher's Istanbul day for Google's DateTime
// syntax. 00:00 is a day-boundary convention, not an observed publication time.
export function editorialSchemaDateTime(date: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10) !== date) {
    throw new Error("Expected a valid editorial calendar date");
  }
  return `${date}T00:00:00+03:00`;
}
