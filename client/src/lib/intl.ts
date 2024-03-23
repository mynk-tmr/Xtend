export const isoToLocale = (iso: string) =>
  iso.replace(/(\d{4})-(\d{2})-(\d{2}).*/, "$3-$2-$1");

export const dateToISO = (dates: string[]) => {
  return dates.map((date) => {
    const [day, month, year] = date.split("/").map((x) => parseInt(x));
    // Minus 1 from month as JavaScript months are zero-indexed (January = 0)
    return new Date(year, month - 1, day);
  });
};
