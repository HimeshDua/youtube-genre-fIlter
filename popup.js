document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('genreInput');
  const saveBtn = document.getElementById('saveGenres');
  const clearBtn = document.getElementById('clearGenres');
  const refreshBtn = document.getElementById('refreshNow');
  const currentGenres = document.getElementById('currentGenres');

  function showCurrent(genres) {
    currentGenres.textContent = genres
      ? `Current Filters: ${genres}`
      : 'No filters applied.';
  }

  browser.storage.local.get('genres').then((data) => {
    const genres = data.genres || '';
    input.value = genres;
    showCurrent(genres);
  });

  saveBtn.addEventListener('click', () => {
    const genres = input.value.trim().toLowerCase();
    browser.storage.local.set({genres}).then(() => {
      showCurrent(genres);
    });
  });

  clearBtn.addEventListener('click', () => {
    input.value = '';
    browser.storage.local.set({genres: ''}).then(() => {
      showCurrent('');
    });
  });

  refreshBtn.addEventListener('click', () => {
    browser.runtime.sendMessage({action: 'refreshFilter'});
  });
});
