export const rupiah = (n) => "Rp " + Math.round(n).toLocaleString("id-ID");

export const monthKey = (isoDate) => isoDate.slice(0, 7);

export const formatDateLabel = (isoDate) =>
  new Date(isoDate + "T00:00:00").toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

// Contoh: "Kamis, 13 Agustus 2026 pukul 15.00"
export const formatDateTimeLabel = (date) => {
  const d = date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const t = date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  return `${d} pukul ${t}`;
};
