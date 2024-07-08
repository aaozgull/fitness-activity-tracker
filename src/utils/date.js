/* export function getFormattedDate(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}

export function getDatePlusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
} */

export function getFormattedDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getDateMinusDays(date, days) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() - days);
  return newDate;
}

export function getDatePlusDays(date, days) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}
