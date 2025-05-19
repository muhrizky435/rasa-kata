async function getYouTubeTitle(linkVideo) {
  const oEmbedURL = `https://www.youtube.com/oembed?url=${linkVideo}&format=json`;

  return fetch(oEmbedURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Video not found or inaccessible");
      }
      return response.json();
    })
}

export default getYouTubeTitle;
