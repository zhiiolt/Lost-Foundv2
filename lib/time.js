/** @format */

export function timeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString); // Mengonversi string tanggal ke objek Date
  const diff = now - past; // Selisih waktu dalam milidetik

  // Konversi waktu ke unit yang lebih besar
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30); // Perkiraan 30 hari per bulan
  const years = Math.floor(days / 365); // Perkiraan 365 hari per tahun

  // Pilih format berdasarkan durasi
  if (years > 0) return `${years} tahun lalu`;
  if (months > 0) return `${months} bulan lalu`;
  if (weeks > 0) return `${weeks} minggu lalu`;
  if (days > 0) return `${days} hari lalu`;
  if (hours > 0) return `${hours} jam lalu`;
  if (minutes > 0) return `${minutes} menit lalu`;
  return `${seconds} detik lalu`;
}

export const formatTanggal = (tanggal) => {
  const dateObj = new Date(tanggal);

  const bulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const hari = dateObj.getDate();
  const bulanNama = bulan[dateObj.getMonth()];
  const tahun = dateObj.getFullYear();

  return `${hari} ${bulanNama} ${tahun}`;
};

export const convertDateString = (inputString) => {
  // Pisahkan tanggal dan waktu menggunakan koma
  const [datePart] = inputString.split(", ");

  // Pisahkan bulan, hari, dan tahun
  const [month, day, year] = datePart.split("/");

  // Format menjadi "yyyy/MM/dd"
  const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
    2,
    "0"
  )}`;

  return formattedDate;
};
