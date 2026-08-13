// Membuat tanggal ISO lokal (YYYY-MM-DD), mundur N hari dari hari ini
function isoDaysAgo(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const now = new Date();
export const NOW_MONTH = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

// Data dummy — tanggal dihitung relatif terhadap hari ini agar dashboard
// selalu tampak hidup (grafik, statistik bulan ini, dan filter langsung terisi).
export const INITIAL_TRANSACTIONS = [
  // ---- Bulan berjalan ----

];
