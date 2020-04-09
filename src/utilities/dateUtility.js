export const formatDateTime = date => {
  let pubDate = new Date(date);
  const pubDateFormatted =
    pubDate.getFullYear() +
    "-" +
    (pubDate.getMonth() + 1).toString().padStart(2, 0) +
    "-" +
    pubDate
      .getDate()
      .toString()
      .padStart(2, 0);

  const pubtimeFormatted =
    pubDate.getHours() +
    ":" +
    pubDate
      .getMinutes()
      .toString()
      .padStart(2, 0) +
    ":" +
    pubDate
      .getSeconds()
      .toString()
      .padStart(2, 0);

  pubDate = `${pubDateFormatted} ${pubtimeFormatted}`;
  return pubDate;
};
