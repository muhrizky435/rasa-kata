/**
 * Converts an ISO date string to a relative time description in Indonesian
 * @param {string} isoString - ISO date string to convert
 * @returns {string} Human-readable relative time in Indonesian (e.g. "2 jam yang lalu")
 */
export const formatRelativeTime = (isoString) => {
  if (!isoString) return '';
  
  const date = new Date(isoString);
  const now = new Date();
  
  // Calculate time difference in seconds
  const secondsDiff = Math.floor((now - date) / 1000);
  
  // Less than a minute
  if (secondsDiff < 60) {
    return 'baru saja';
  }
  
  // Minutes
  const minutesDiff = Math.floor(secondsDiff / 60);
  if (minutesDiff < 60) {
    return `${minutesDiff} menit yang lalu`;
  }
  
  // Hours
  const hoursDiff = Math.floor(minutesDiff / 60);
  if (hoursDiff < 24) {
    return `${hoursDiff} jam yang lalu`;
  }
  
  // Days
  const daysDiff = Math.floor(hoursDiff / 24);
  if (daysDiff < 7) {
    return `${daysDiff} hari yang lalu`;
  }
  
  // Weeks
  const weeksDiff = Math.floor(daysDiff / 7);
  if (weeksDiff < 4) {
    return `${weeksDiff} minggu yang lalu`;
  }
  
  // Months
  const monthsDiff = Math.floor(daysDiff / 30);
  if (monthsDiff < 12) {
    return `${monthsDiff} bulan yang lalu`;
  }
  
  // Years
  const yearsDiff = Math.floor(daysDiff / 365);
  return `${yearsDiff} tahun yang lalu`;
};

/**
 * Formats an ISO date string to Indonesian date format
 * @param {string} isoString - ISO date string to convert
 * @param {boolean} includeTime - Whether to include the time in the result
 * @returns {string} Formatted date string (e.g. "12 Mei 2025")
 */
export const formatDate = (isoString, includeTime = false) => {
  if (!isoString) return '';
  
  const date = new Date(isoString);
  
  const day = date.getDate();
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  
  let result = `${day} ${month} ${year}`;
  
  if (includeTime) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    result += ` ${hours}:${minutes}`;
  }
  
  return result;
};

/**
 * Returns either a relative time or a formatted date depending on how recent the date is
 * @param {string} isoString - ISO date string to convert
 * @returns {string} Either relative time or formatted date string
 */
export const smartDateFormat = (isoString) => {
  if (!isoString) return '';
  
  const date = new Date(isoString);
  const now = new Date();
  const daysDiff = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  
  // If less than 7 days ago, show relative time
  if (daysDiff < 7) {
    return formatRelativeTime(isoString);
  }
  
  // Otherwise, show the formatted date
  return formatDate(isoString);
};

export const formatIndonesianDate = (isoString) => {
  const date = new Date(isoString);

  const formatter = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const timeFormatter = new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const datePart = formatter.format(date);  // e.g., "17 April 2025"
  const timePart = timeFormatter.format(date);  // e.g., "10.00"

  return `${datePart} pukul ${timePart.replace('.', ':')}`;
}

export default {
  formatRelativeTime,
  formatDate,
  smartDateFormat,
  formatIndonesianDate,
};