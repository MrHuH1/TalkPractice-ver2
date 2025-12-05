// =============== NAVIGATION ===============
const navLinks = document.querySelectorAll('header nav a');
const sections = document.querySelectorAll('.section');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    const target = link.getAttribute('data-section');
    sections.forEach(sec => sec.classList.add('hidden'));
    document.getElementById(target).classList.remove('hidden');

    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    if (target === 'progress') loadProgress();
  });
});

// =============== BACK TO TOP ===============
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) backToTop.classList.add('show');
  else backToTop.classList.remove('show');
});
backToTop.addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);

// =============== PROGRESS & STORAGE ===============
const PROGRESS_KEY = 'talkPracticeProgress';

function defaultProgress() {
  return {
    totalSeconds: 0,
    sessions: 0,
    counts: {
      idioms: 0,
      chunks: 0,
      dialogues: 0,
      daily: 0,
    },
  };
}

function readProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return defaultProgress();
    const parsed = JSON.parse(raw);
    return { ...defaultProgress(), ...parsed };
  } catch {
    return defaultProgress();
  }
}

function writeProgress(p) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
  } catch (e) {
    console.warn('Cannot save progress', e);
  }
}

function addProgress(type, seconds) {
  const p = readProgress();
  p.totalSeconds += seconds;
  p.sessions += 1;
  if (p.counts[type] !== undefined) {
    p.counts[type] += 1;
  }
  writeProgress(p);
}

function loadProgress() {
  const p = readProgress();
  const minutes = Math.round(p.totalSeconds / 60);
  document.getElementById('total-minutes').textContent = minutes;
  document.getElementById('total-sessions').textContent = p.sessions;
  document.getElementById('count-idioms').textContent = p.counts.idioms;
  document.getElementById('count-chunks').textContent = p.counts.chunks;
  document.getElementById('count-dialogues').textContent = p.counts.dialogues;
  document.getElementById('count-daily').textContent = p.counts.daily;

  const badge10min = document.getElementById('badge-10min');
  const badge30min = document.getElementById('badge-30min');
  const badge10sessions = document.getElementById('badge-10sessions');
  const badgeIdiom = document.getElementById('badge-idiom-lover');
  const badgeChunk = document.getElementById('badge-chunk-hero');

  if (minutes >= 10) badge10min.classList.add('earned');
  if (minutes >= 30) badge30min.classList.add('earned');
  if (p.sessions >= 10) badge10sessions.classList.add('earned');
  if (p.counts.idioms >= 5) badgeIdiom.classList.add('earned');
  if (p.counts.chunks >= 5) badgeChunk.classList.add('earned');
}

// =============== DAILY TASK (NEW EVERY DAY) ===============
const dailyPromptEl = document.getElementById('daily-prompt');

const DAILY_TASKS = [
  'Describe your perfect weekend in detail.',
  'Talk about a person who inspires you and explain why.',
  'Describe a difficult situation that you handled well.',
  'If you could travel anywhere, where would you go and why?',
  'Talk about your daily routine on a school or work day.',
  'Describe your favourite place in your city.',
  'Talk about a hobby you enjoy and how you started it.',
  'Describe a memorable holiday or celebration.',
  'Talk about a time when you felt proud of yourself.',
  'Describe your dream job and why you want it.',
  'Talk about your favourite book, film or series.',
  'Describe a time you helped someone.',
  'Talk about how you use social media in your life.',
  'Describe your ideal school or college.',
  'Talk about the best teacher you have ever had.',
  'Describe a trip you would like to take with friends.',
  'Talk about your plans for the next 5 years.',
  'Describe a typical day in your family.',
  'Talk about food in your country.',
  'Describe a sport you like and why.',
  'Talk about technology in your life (phone, PC, etc.).',
  'Describe your favourite season and what you do then.',
  'Talk about music you like listening to.',
  'Describe your morning routine on a weekday.',
  'Talk about a time you were really surprised.',
  'Describe your best friend.',
  'Talk about a big change in your life.',
  'Describe how you relax after a hard day.',
  'Talk about learning English: what is easy and difficult for you.',
  'Describe a goal you want to achieve this year.'
];

function getDailyTask() {
  const today = new Date();
  const base = new Date(2025, 0, 1); // 1 Jan 2025
  const diffDays = Math.floor((today - base) / (1000 * 60 * 60 * 24));
  const idx = ((diffDays % DAILY_TASKS.length) + DAILY_TASKS.length) % DAILY_TASKS.length;
  return DAILY_TASKS[idx];
}

if (dailyPromptEl) {
  dailyPromptEl.textContent = getDailyTask();
}

// =============== DATA: 20 IDIOMS, 20 CHUNKS, 20 DIALOGUES ===============
const IDIOMS = [
  {
    id: 1,
    phrase: 'break the ice',
    meaning: 'start a conversation and make people feel relaxed',
    example: 'He told a joke to break the ice.',
    task: 'Tell a short story when you had to break the ice with someone new.'
  },
  {
    id: 2,
    phrase: 'once in a blue moon',
    meaning: 'very rarely',
    example: 'I eat fast food once in a blue moon.',
    task: 'Describe something you do once in a blue moon.'
  },
  {
    id: 3,
    phrase: 'a piece of cake',
    meaning: 'something very easy',
    example: 'The test was a piece of cake.',
    task: 'Talk about something that is a piece of cake for you.'
  },
  {
    id: 4,
    phrase: 'hit the books',
    meaning: 'study very hard',
    example: 'I need to hit the books before the exam.',
    task: 'Describe a time when you had to hit the books.'
  },
  {
    id: 5,
    phrase: 'under the weather',
    meaning: 'feeling a bit ill',
    example: 'I am feeling under the weather today.',
    task: 'Talk about what you do when you feel under the weather.'
  },
  {
    id: 6,
    phrase: 'cost an arm and a leg',
    meaning: 'very expensive',
    example: 'That phone cost an arm and a leg.',
    task: 'Describe something that costs an arm and a leg nowadays.'
  },
  {
    id: 7,
    phrase: 'break a leg',
    meaning: 'good luck (before a performance)',
    example: 'You have a test today? Break a leg!',
    task: 'Imagine your friend has an important exam. What would you say to them?'
  },
  {
    id: 8,
    phrase: 'spill the beans',
    meaning: 'reveal a secret',
    example: 'Who spilled the beans about the surprise party?',
    task: 'Talk about a time when someone spilled the beans.'
  },
  {
    id: 9,
    phrase: 'beat around the bush',
    meaning: 'avoid saying something directly',
    example: 'Stop beating around the bush and tell me the truth.',
    task: 'Describe a situation when people often beat around the bush.'
  },
  {
    id: 10,
    phrase: 'call it a day',
    meaning: 'stop working on something',
    example: 'We are tired, let’s call it a day.',
    task: 'Talk about a time when you decided to call it a day.'
  },
  {
    id: 11,
    phrase: 'hit the nail on the head',
    meaning: 'describe exactly what is causing a situation',
    example: 'You hit the nail on the head with your answer.',
    task: 'Describe a moment when someone hit the nail on the head.'
  },
  {
    id: 12,
    phrase: 'let the cat out of the bag',
    meaning: 'accidentally reveal a secret',
    example: 'He let the cat out of the bag about the present.',
    task: 'Tell a story where someone let the cat out of the bag.'
  },
  {
    id: 13,
    phrase: 'time flies',
    meaning: 'time passes very quickly',
    example: 'Time flies when you are having fun.',
    task: 'Talk about a situation when time really flew for you.'
  },
  {
    id: 14,
    phrase: 'on cloud nine',
    meaning: 'very happy',
    example: 'She was on cloud nine after passing the exam.',
    task: 'Describe a time when you were on cloud nine.'
  },
  {
    id: 15,
    phrase: 'in hot water',
    meaning: 'in trouble',
    example: 'He was in hot water with his parents.',
    task: 'Talk about a moment when someone you know was in hot water.'
  },
  {
    id: 16,
    phrase: 'face the music',
    meaning: 'accept the results of your actions',
    example: 'He had to face the music after cheating.',
    task: 'Describe a situation when you had to face the music.'
  },
  {
    id: 17,
    phrase: 'the last straw',
    meaning: 'the final problem in a series of problems',
    example: 'Being late again was the last straw.',
    task: 'Talk about a situation when something was the last straw.'
  },
  {
    id: 18,
    phrase: 'over the moon',
    meaning: 'extremely happy',
    example: 'They were over the moon about the news.',
    task: 'Describe a moment when you felt over the moon.'
  },
  {
    id: 19,
    phrase: 'kill two birds with one stone',
    meaning: 'solve two problems with one action',
    example: 'I killed two birds with one stone: studied and met my friend.',
    task: 'Explain how you can kill two birds with one stone in your life.'
  },
  {
    id: 20,
    phrase: 'a blessing in disguise',
    meaning: 'something that seems bad but later is good',
    example: 'Losing that job was a blessing in disguise.',
    task: 'Tell a story where a problem was a blessing in disguise.'
  }
];

const CHUNKS = [
  { id: 1, phrase: 'In my opinion', task: 'Give your opinion about online learning vs traditional learning.' },
  { id: 2, phrase: 'To be honest', task: 'Be honest about something you do not like at school or work.' },
  { id: 3, phrase: 'It depends', task: 'Answer a question where the answer is not yes or no – start with "It depends".' },
  { id: 4, phrase: 'As far as I know', task: 'Talk about something you know, but you are not 100% sure.' },
  { id: 5, phrase: 'I would rather', task: 'Say what you would rather do on a Friday evening and why.' },
  { id: 6, phrase: 'I am not sure but', task: 'Answer a difficult question using this chunk.' },
  { id: 7, phrase: 'From my point of view', task: 'Describe your point of view on social media.' },
  { id: 8, phrase: 'The thing is', task: 'Explain a problem you have using this chunk.' },
  { id: 9, phrase: 'At the same time', task: 'Talk about advantages and disadvantages of smartphones.' },
  { id: 10, phrase: 'On the one hand', task: 'Start an answer with "On the one hand…" and continue with pros and cons.' },
  { id: 11, phrase: 'On the other hand', task: 'Continue an opinion by showing the other side of the situation.' },
  { id: 12, phrase: 'That’s a good question', task: 'React to a difficult question using this chunk.' },
  { id: 13, phrase: 'If you ask me', task: 'Share your personal opinion about exams.' },
  { id: 14, phrase: 'As I said before', task: 'Repeat and add more detail to an idea you already mentioned.' },
  { id: 15, phrase: 'What I mean is', task: 'Correct yourself or explain your idea more clearly.' },
  { id: 16, phrase: 'To be fair', task: 'Show that you see both sides of a situation.' },
  { id: 17, phrase: 'At the end of the day', task: 'Finish your answer with a final summary.' },
  { id: 18, phrase: 'I totally agree', task: 'Agree with someone and add extra information.' },
  { id: 19, phrase: 'I don’t really agree', task: 'Disagree politely and explain why.' },
  { id: 20, phrase: 'Let me think for a second', task: 'Use this chunk at the start of a longer answer.' }
];

const DIALOGUES = [
  {
    id: 1,
    title: 'At the Café',
    keywords: 'cafe coffee tea order food',
    questions: [
      'What would you like to drink?',
      'Tea or coffee?',
      'Are you ready to order?',
      'How is your meal?'
    ]
  },
  {
    id: 2,
    title: 'At School',
    keywords: 'school subject classmates homework',
    questions: [
      'What is your favourite subject?',
      'How many lessons do you have a day?',
      'Do you like your classmates?',
      'What do you usually do after school?'
    ]
  },
  {
    id: 3,
    title: 'Family',
    keywords: 'family parents brother sister',
    questions: [
      'How many people are there in your family?',
      'Who do you spend the most time with at home?',
      'What do you usually do together as a family?',
      'What is one good memory with your family?'
    ]
  },
  {
    id: 4,
    title: 'Hobbies',
    keywords: 'hobbies free time interests',
    questions: [
      'What hobbies do you have?',
      'How often do you do your hobby?',
      'Do you prefer doing hobbies alone or with friends?',
      'Why is this hobby important to you?'
    ]
  },
  {
    id: 5,
    title: 'Travelling',
    keywords: 'travel trip holiday journey',
    questions: [
      'Do you like travelling? Why or why not?',
      'What place would you like to visit?',
      'Do you prefer travelling alone or with others?',
      'What was your most memorable trip?'
    ]
  },
  {
    id: 6,
    title: 'Shopping',
    keywords: 'shopping clothes money mall',
    questions: [
      'How often do you go shopping?',
      'Do you like shopping for clothes?',
      'Do you prefer online or offline shopping?',
      'Have you ever bought something you regretted?'
    ]
  },
  {
    id: 7,
    title: 'At the Doctor',
    keywords: 'doctor health illness medicine',
    questions: [
      'How often do you go to the doctor?',
      'What do you do to stay healthy?',
      'Are you afraid of visiting dentists?',
      'What advice would you give to a friend who is sick?'
    ]
  },
  {
    id: 8,
    title: 'Sports',
    keywords: 'sport football basketball gym',
    questions: [
      'What sports do you like watching or playing?',
      'How often do you exercise?',
      'Do you prefer team sports or individual sports?',
      'Why is sport important for people?'
    ]
  },
  {
    id: 9,
    title: 'Weather & Seasons',
    keywords: 'weather season summer winter',
    questions: [
      'What is your favourite season and why?',
      'What is the weather like in your city in winter?',
      'What do you do when the weather is very bad?',
      'How does weather affect your mood?'
    ]
  },
  {
    id: 10,
    title: 'Future Plans',
    keywords: 'future plan dream goals',
    questions: [
      'What are your plans for next year?',
      'What job would you like to have in the future?',
      'Would you like to live in another country?',
      'What skills do you want to learn?'
    ]
  },
  {
    id: 11,
    title: 'At the Airport',
    keywords: 'airport plane flight travel',
    questions: [
      'Have you ever been to an airport?',
      'What do people usually do while waiting for a flight?',
      'Are you afraid of flying?',
      'What is important to remember before a flight?'
    ]
  },
  {
    id: 12,
    title: 'In a Hotel',
    keywords: 'hotel room reservation stay',
    questions: [
      'Have you ever stayed in a hotel?',
      'What is important for you in a hotel room?',
      'Do you prefer big hotels or small guest houses?',
      'Describe a good or bad hotel experience.'
    ]
  },
  {
    id: 13,
    title: 'Online Learning',
    keywords: 'online learning computer internet',
    questions: [
      'Do you like online lessons?',
      'What are the advantages of online learning?',
      'What are the disadvantages?',
      'Which do you prefer: online or offline learning?'
    ]
  },
  {
    id: 14,
    title: 'Social Media',
    keywords: 'social media instagram tiktok',
    questions: [
      'How often do you use social media?',
      'What social networks do you like the most?',
      'What is good about social media?',
      'What can be dangerous about social media?'
    ]
  },
  {
    id: 15,
    title: 'Job Interview',
    keywords: 'job interview work career',
    questions: [
      'What job would you apply for?',
      'What skills would you talk about in an interview?',
      'How would you answer the question “Why should we hire you?”',
      'What questions would you ask the company?'
    ]
  },
  {
    id: 16,
    title: 'Movies & Series',
    keywords: 'movies series cinema film',
    questions: [
      'What is your favourite movie or series?',
      'Do you prefer watching at home or in the cinema?',
      'How often do you watch something in English?',
      'What kind of movies do you not like?'
    ]
  },
  {
    id: 17,
    title: 'Technology',
    keywords: 'technology phone computer internet',
    questions: [
      'What gadgets do you use every day?',
      'Could you live one day without your phone?',
      'How has technology changed your life?',
      'Do you think technology is always good? Why or why not?'
    ]
  },
  {
    id: 18,
    title: 'Food & Cooking',
    keywords: 'food cooking breakfast dinner',
    questions: [
      'What is your favourite food?',
      'Do you like cooking?',
      'What do you usually eat for breakfast?',
      'Is healthy food important for you? Why?'
    ]
  },
  {
    id: 19,
    title: 'Holidays & Traditions',
    keywords: 'holiday tradition family celebration',
    questions: [
      'What is your favourite holiday?',
      'How do you usually celebrate it?',
      'Do you prefer quiet or big celebrations?',
      'What holiday traditions are important in your country?'
    ]
  },
  {
    id: 20,
    title: 'New City',
    keywords: 'city travel explore map',
    questions: [
      'Imagine you moved to a new city. What would you do on the first day?',
      'How would you make new friends there?',
      'What places would you like to visit in a new city?',
      'Would you prefer a big city or a small town? Why?'
    ]
  }
];

// =============== DOM GENERATION ===============
const idiomsListEl = document.getElementById('idioms-list');
const chunksListEl = document.getElementById('chunks-list');
const dialoguesListEl = document.getElementById('dialogues-list');
const globalAudio = document.getElementById('globalAudio');

function createIdiomCard(item) {
  const card = document.createElement('div');
  card.className = 'card';
  const recId = `rec-idiom-${item.id}`;
  const playId = `play-idiom-${item.id}`;
  const statsId = `stats-idiom-${item.id}`;
  const aiId = `ai-idiom-${item.id}`;

  card.innerHTML = `
    <h3>${item.id}. ${item.phrase}</h3>
    <p><strong>Meaning:</strong> ${item.meaning}</p>
    <p><strong>Example:</strong> ${item.example}</p>
    <p class="hint"><em>Task:</em> ${item.task}</p>
    <div class="controls">
      <button class="btn" id="${recId}">🎤 Record</button>
      <button class="btn secondary" id="${playId}" disabled>▶️ Listen</button>
      <button class="btn ai" data-ai
        data-expected="${item.phrase.toLowerCase()}"
        data-result-id="${aiId}">🤖 AI</button>
    </div>
    <p id="${statsId}" class="mini-level"></p>
    <div id="${aiId}" class="ai-result"></div>
  `;
  idiomsListEl.appendChild(card);
  setupRecorder(recId, playId, statsId, 'idioms', 45);
}

function createChunkCard(item) {
  const card = document.createElement('div');
  card.className = 'card';
  const recId = `rec-chunk-${item.id}`;
  const playId = `play-chunk-${item.id}`;
  const statsId = `stats-chunk-${item.id}`;
  const aiId = `ai-chunk-${item.id}`;

  card.innerHTML = `
    <h3>${item.id}. ${item.phrase}…</h3>
    <p class="hint"><em>Task:</em> ${item.task}</p>
    <div class="controls">
      <button class="btn" id="${recId}">🎤 Record</button>
      <button class="btn secondary" id="${playId}" disabled>▶️ Listen</button>
      <button class="btn ai" data-ai
        data-expected="${item.phrase.toLowerCase()}"
        data-result-id="${aiId}">🤖 AI</button>
    </div>
    <p id="${statsId}" class="mini-level"></p>
    <div id="${aiId}" class="ai-result"></div>
  `;
  chunksListEl.appendChild(card);
  setupRecorder(recId, playId, statsId, 'chunks', 90);
}

function createDialogueCard(item) {
  const card = document.createElement('div');
  card.className = 'card';
  const recId = `rec-dialogue-${item.id}`;
  const playId = `play-dialogue-${item.id}`;
  const statsId = `stats-dialogue-${item.id}`;
  const aiId = `ai-dialogue-${item.id}`;

  const questionsHtml = item.questions
    .map(q => `<li>${q}</li>`)
    .join('');

  card.innerHTML = `
    <h3>${item.id}. ${item.title}</h3>
    <ol>${questionsHtml}</ol>
    <div class="controls">
      <button class="btn" id="${recId}">🎤 Record</button>
      <button class="btn secondary" id="${playId}" disabled>▶️ Listen</button>
      <button class="btn ai" data-ai
        data-expected="${item.keywords}"
        data-result-id="${aiId}">🤖 AI</button>
    </div>
    <p id="${statsId}" class="mini-level"></p>
    <div id="${aiId}" class="ai-result"></div>
  `;
  dialoguesListEl.appendChild(card);
  setupRecorder(recId, playId, statsId, 'dialogues', 90);
}

// generate all cards
IDIOMS.forEach(createIdiomCard);
CHUNKS.forEach(createChunkCard);
DIALOGUES.forEach(createDialogueCard);

// =============== AUDIO RECORDING ===============
async function setupRecorder(recordId, playId, statsId, type, maxSeconds = 90) {
  const recBtn = document.getElementById(recordId);
  const playBtn = document.getElementById(playId);
  const statsEl = document.getElementById(statsId);
  if (!recBtn) return;

  let mediaRecorder;
  let chunks = [];
  let isRecording = false;
  let startTime = 0;

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = e => {
      chunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/webm' });
      chunks = [];
      const url = URL.createObjectURL(blob);
      globalAudio.src = url;

      if (playBtn) {
        playBtn.disabled = false;
        playBtn.onclick = () => globalAudio.play().catch(() => {});
      }

      const seconds = Math.min(maxSeconds, (Date.now() - startTime) / 1000);
      const miniLevel =
        seconds < 20 ? 'Mini level: A1 (very short answer)' :
        seconds < 45 ? 'Mini level: A2 (short monologue)' :
                       'Mini level: B1 (long answer)';

      if (statsEl) {
        statsEl.textContent = `⏱️ ${seconds.toFixed(1)}s — ${miniLevel}`;
      }

      addProgress(type, seconds);
    };
  } catch (err) {
    console.error('Mic error', err);
    recBtn.disabled = true;
    recBtn.textContent = '❌ Mic error';
    return;
  }

  recBtn.addEventListener('click', () => {
    if (!mediaRecorder) return;
    if (!isRecording) {
      chunks = [];
      mediaRecorder.start();
      startTime = Date.now();
      isRecording = true;
      recBtn.textContent = '⏹ Stop';
    } else {
      mediaRecorder.stop();
      isRecording = false;
      recBtn.textContent = '🎤 Record';
    }
  });
}

// DAILY recorder
setupRecorder('rec-daily', 'play-daily', 'stats-daily', 'daily', 150);

// =============== SIMPLE AI (WEB SPEECH) ===============
function evaluatePronunciation(expectedText, resultElementId) {
  const resultEl = document.getElementById(resultElementId);
  if (!resultEl) return;

  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRec) {
    resultEl.textContent = 'AI speech evaluation works only in Chrome / Edge (desktop or Android).';
    resultEl.className = 'ai-result show bad';
    return;
  }

  const recognizer = new SpeechRec();
  recognizer.lang = 'en-US';
  recognizer.interimResults = false;
  recognizer.maxAlternatives = 1;

  resultEl.textContent = '🤖 Listening… please say the phrase or your answer again.';
  resultEl.className = 'ai-result show';

  recognizer.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    const confidence = event.results[0][0].confidence || 0;

    const cleanExpected = (expectedText || '').toLowerCase();
    const expectedWords = cleanExpected.split(/\s+/).filter(Boolean);
    const saidWords = transcript.split(/\s+/).filter(Boolean);

    let matchCount = 0;
    expectedWords.forEach(w => {
      if (saidWords.includes(w)) matchCount++;
    });

    const wordScore = expectedWords.length
      ? matchCount / expectedWords.length
      : 0;
    const totalScore = (wordScore * 0.7) + (confidence * 0.3);

    let label, cls;
    if (totalScore > 0.7) {
      label = 'Excellent ✅';
      cls = 'good';
    } else if (totalScore > 0.4) {
      label = 'Good 👍';
      cls = 'ok';
    } else {
      label = 'Needs practice 💬';
      cls = 'bad';
    }

    resultEl.className = `ai-result show ${cls}`;
    resultEl.innerHTML = `
      <strong>${label}</strong><br>
      You said: <em>${transcript}</em><br>
      Match with target words: ${(wordScore * 100).toFixed(0)}%<br>
      Confidence: ${(confidence * 100).toFixed(0)}%
    `;
  };

  recognizer.onerror = (e) => {
    resultEl.className = 'ai-result show bad';
    resultEl.textContent = 'AI error: ' + e.error + '. Try again or speak clearly.';
  };

  recognizer.start();
}

// attach AI buttons
function attachAiButtons() {
  document.querySelectorAll('[data-ai]').forEach(btn => {
    btn.addEventListener('click', () => {
      const expected = btn.getAttribute('data-expected') || '';
      const resultId = btn.getAttribute('data-result-id');
      evaluatePronunciation(expected, resultId);
    });
  });
}

// wait a tiny bit to ensure all cards are in DOM
setTimeout(attachAiButtons, 0);
