function translateEmotionCode(code) {
  const emotionMap = {
    0: 'sedih',
    1: 'senang',
    2: 'cinta',
    3: 'marah',
    4: 'takut',
    5: 'terkejut',
  };

  return emotionMap[code] || 'unknown';
}

export default translateEmotionCode;