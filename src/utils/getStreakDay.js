function getStreakDay(timestamp) {
  if (timestamp.length === 0) return 0;

  const sortedTimestamps = [...timestamp].sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });

  const isConsecutive = (currentDate, nextDate) => {
    const currentMidnight = new Date(currentDate);
    currentMidnight.setUTCHours(0, 0, 0, 0);
    const nextMidnight = new Date(nextDate);
    nextMidnight.setUTCHours(0, 0, 0, 0);
    const diff = currentMidnight - nextMidnight;
    return diff === 86400000; // 1 day in milliseconds
  };
  
  const latestEntryDate = new Date(sortedTimestamps[0].created_at);
  const today = new Date();
  const isLatestToday =
    latestEntryDate.getUTCFullYear() === today.getUTCFullYear() &&
    latestEntryDate.getUTCMonth() === today.getUTCMonth() &&
    latestEntryDate.getUTCDate() === today.getUTCDate();

  if (!isLatestToday) return 0;

  let streak = 1;

  for (let i = 0; i < sortedTimestamps.length - 1; i++) {
    const currentDate = new Date(sortedTimestamps[i].created_at);
    const nextDate = new Date(sortedTimestamps[i + 1].created_at);

    if (isConsecutive(currentDate, nextDate)) {
      streak++;
    } else {
      break; 
    }
  }

  return streak;
}

export default getStreakDay;