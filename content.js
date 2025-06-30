const GENRE_KEYWORDS = {
  Coding: [
    'code',
    'programming',
    'java',
    'c#',
    'python',
    'developer',
    'software',
    'language',
    'languages',
    'javascript',
    'script',
    'coding',
    'css',
    'tailwind',
    'typescript',
    'html',
    'github',
    'web',
    'backend',
    'frontend',
    'fullstack',
    'ai',
    'ml',
    'data science',
    'algorithm',
    'database',
    'sql',
    'nosql',
    'cloud',
    'aws',
    'azure',
    'devops',
    'api',
    'framework',
    'library',
    'react',
    'angular',
    'vue',
    'node',
    'express',
    'django',
    'flask',
    'ruby',
    'php',
    'swift',
    'kotlin',
    'android',
    'ios',
    'blockchain',
    'cybersecurity',
    'linux',
    'ubuntu',
    'git',
    'vscode',
    'ide'
  ],
  Gaming: [
    'game',
    'gta',
    'valorant',
    'minecraft',
    'fps',
    'gaming',
    'pubg',
    'fortnite',
    'call of duty',
    'elden ring',
    'zelda',
    'nintendo',
    'playstation',
    'xbox',
    'pc gaming',
    'stream',
    'twitch',
    'esports',
    'multiplayer',
    'single player',
    'rpg',
    'strategy',
    'adventure',
    'simulator',
    'indie game',
    'mod',
    'walkthrough',
    'gameplay',
    'gamer',
    'controller',
    'keyboard',
    'mouse',
    'vr',
    'retro gaming'
  ],
  Music: [
    'music',
    'song',
    'cover',
    'instrumental',
    'concert',
    'guitar',
    'album',
    'artist',
    'band',
    'singer',
    'vocal',
    'lyrics',
    'genre',
    'pop',
    'rock',
    'hip hop',
    'rap',
    'edm',
    'classical',
    'jazz',
    'blues',
    'folk',
    'country',
    'playlist',
    'spotify',
    'apple music',
    'youtube music',
    'live performance',
    'music video',
    'producer',
    'dj',
    'festival',
    'melody',
    'harmony',
    'rhythm',
    'beat',
    'remix'
  ],
  News: [
    'news',
    'breaking',
    'election',
    'pakistan',
    'cnn',
    'bbc',
    'politics',
    'current events',
    'world news',
    'local news',
    'finance',
    'economy',
    'stock market',
    'business',
    'technology news',
    'science news',
    'health news',
    'sports news',
    'weather',
    'disaster',
    'crisis',
    'report',
    'journalism',
    'investigation',
    'interview',
    'analysis',
    'documentary',
    'update',
    'headline',
    'media',
    'press'
  ],
  Education: [
    'lecture',
    'tutorial',
    'study',
    'teacher',
    'university',
    'school',
    'college',
    'course',
    'lesson',
    'learn',
    'learning',
    'student',
    'professor',
    'education',
    'academic',
    'research',
    'knowledge',
    'skill',
    'online course',
    'webinar',
    'workshop',
    'degree',
    'diploma',
    'syllabus',
    'exam',
    'quiz',
    'homework',
    'assignment',
    'textbook',
    'science',
    'math',
    'history',
    'english',
    'literature',
    'geography',
    'biology',
    'chemistry',
    'physics',
    'computer science',
    'engineering'
  ],
  Entertainment: [
    'comedy',
    'roast',
    'funny',
    'web series',
    'drama',
    'movie',
    'show',
    'film',
    'tv series',
    'actor',
    'actress',
    'director',
    'producer',
    'hollywood',
    'bollywood',
    'standup',
    'stand-up',
    'sketch',
    'vlog',
    'challenge',
    'reaction',
    'prank',
    'celebrity',
    'interview',
    'talk show',
    'reality show',
    'animation',
    'cartoon',
    'documentary',
    'trailer',
    'review',
    'spoiler',
    'plot',
    'character',
    'entertainment news',
    'gossip'
  ]
};

function getKeywords(selectedGenres) {
  return selectedGenres.flatMap((g) => GENRE_KEYWORDS[g] || []);
}

function filterVideos(selectedGenres) {
  const keywords = getKeywords(selectedGenres).map((k) => k.toLowerCase());
  const videos = document.querySelectorAll('ytd-rich-item-renderer');

  videos.forEach((video) => {
    const title = video.innerText.toLowerCase();
    const isShort = video.innerHTML.includes('/shorts/');
    if (isShort) {
      video.style.display = 'none';
      return;
    }

    const matched = keywords.some((kw) => title.includes(kw));
    video.style.display = matched ? 'block' : 'none';
  });
}

function initFiltering() {
  browser.storage.local.get('genres').then((data) => {
    const selected = data.genres || [];
    filterVideos(selected);

    const observer = new MutationObserver(() => {
      filterVideos(selected);
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

initFiltering();

// Respond to refresh button
browser.runtime.onMessage.addListener((msg) => {
  if (msg.action === 'refreshFilter') {
    browser.storage.local.get('genres').then((data) => {
      filterVideos(data.genres || []);
    });
  }
});
