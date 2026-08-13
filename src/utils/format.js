export const rupiah = (n) => "Rp " + Math.round(n).toLocaleString("id-ID");

export const monthKey = (isoDate) => isoDate.slice(0, 7);

export const formatDateLabel = (isoDate) =>
  new Date(isoDate + "T00:00:00").toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
