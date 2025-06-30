function getKeywords(genres) {
  return genres
    .split(',')
    .map((g) => g.trim().toLowerCase())
    .filter(Boolean);
}

function filterVideos(genres) {
  const keywords = getKeywords(genres);
  const videos = document.querySelectorAll('ytd-rich-item-renderer');

  videos.forEach((video) => {
    const title = video.innerText.toLowerCase();

    // Always remove Shorts
    const isShort = video.innerHTML.includes('/shorts/');
    if (isShort) {
      video.style.display = 'none';
      return;
    }

    // If no filters, show all non-shorts
    if (keywords.length === 0) {
      video.style.display = 'block';
      return;
    }

    const matched = keywords.some((keyword) => title.includes(keyword));
    video.style.display = matched ? 'block' : 'none';
  });
}

function startFiltering() {
  browser.storage.local.get('genres').then((data) => {
    const genres = data.genres || '';
    filterVideos(genres);

    const observer = new MutationObserver(() => {
      filterVideos(genres);
    });

    observer.observe(
      document.querySelector('ytd-rich-grid-renderer') || document.body,
      {
        childList: true,
        subtree: true
      }
    );
  });
}

startFiltering();

// For "Refresh Now" button in popup
browser.runtime.onMessage.addListener((msg) => {
  if (msg.action === 'refreshFilter') {
    browser.storage.local.get('genres').then((data) => {
      filterVideos(data.genres || '');
    });
  }
});
