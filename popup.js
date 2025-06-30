const GENRES = [
  'Coding',
  'Gaming',
  'Music',
  'News',
  'Education',
  'Entertainment'
];
const form = document.getElementById('genreForm');
const saveBtn = document.getElementById('saveGenres');
const clearBtn = document.getElementById('clearGenres');

GENRES.forEach((genre) => {
  const label = document.createElement('label');
  label.innerHTML = `<input type="checkbox" value="${genre}" /> ${genre}`;
  form.appendChild(label);
});

browser.storage.local.get('genres').then((data) => {
  const selected = data.genres || [];
  document.querySelectorAll('input[type="checkbox"]').forEach((box) => {
    if (selected.includes(box.value)) box.checked = true;
  });
});

saveBtn.onclick = () => {
  const selected = Array.from(
    document.querySelectorAll('input[type="checkbox"]:checked')
  ).map((c) => c.value);

  browser.storage.local.set({genres: selected}).then(() => {
    browser.tabs.query({active: true, currentWindow: true}, (tabs) => {
      const currentTab = tabs[0];
      if (currentTab && currentTab.url.includes('youtube.com')) {
        browser.tabs.reload(currentTab.id);
      }
    });
  });
};

clearBtn.onclick = () => {
  browser.storage.local.set({genres: []});
  document
    .querySelectorAll('input[type="checkbox"]')
    .forEach((c) => (c.checked = false));
};
