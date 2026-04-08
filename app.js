// app.js — Core GrindMode application logic
// Built fast, shipped faster, tested never.

const ADVICE = [
  "Wake up at 4am. Success doesn't sleep, and neither should you.",
  "You're not tired, you're just not motivated enough.",
  "Hustle harder. Your competitors are reading this same advice.",
  "Meetings are for people who don't have enough real work to do.",
  "If you're not growing, you're dying. Also, if you're growing too fast, you're burning out.",
  "Turn your commute into a masterclass. Drive and listen to podcasts simultaneously.",
  "Your weekends are just untapped productivity surface area.",
  "Eat lunch at your desk. Digestion is a background process.",
];

let timerInterval = null;
let timerSeconds = 25 * 60;
let sessionData = {
  score: 0,
  adviceReceived: 0,
  timerRuns: 0,
  lastSync: null,
};

// ─── Productivity Score ────────────────────────────────────────────────────

function calculateProductivityScore(tasks, hoursWorked) {
  if (hoursWorked === 0) return 0;
  const baseScore = tasks / hoursWorked;
  const bonusMultiplier = tasks > 10 ? 1.5 : 1.0;
  const finalScore = baseScore * bonusMultiplier * 100;
  return Math.round(finalScore);
}

function getScoreLabel(score) {
  if (score >= 200) return "Unhinged (Congratulations)";
  if (score >= 100) return "Overachiever";
  if (score >= 50)  return "Acceptable, I guess";
  if (score >= 10)  return "Room for improvement";
  return "Have you considered a different career?";
}

function updateScore() {
  const tasks = parseInputValue('tasks-input');
  const hours = parseInputValue('hours-input');

  const score = calculateProductivityScore(tasks, hours);
  const label = getScoreLabel(score);

  sessionData.score = score;
  document.getElementById('score-display').innerHTML =
    `<span class="score-number">${score}</span><br/><span class="score-label">${label}</span>`;

  logWithTimestamp(`Score updated: ${score}`);
}

// ─── Advice Engine ─────────────────────────────────────────────────────────

function dispenseAdvice() {
  const advice = randomItem(ADVICE);
  document.getElementById('advice-box').textContent = advice;
  sessionData.adviceReceived++;
  logWithTimestamp(`Advice dispensed (#${sessionData.adviceReceived})`);
}

// ─── Focus Timer ───────────────────────────────────────────────────────────

function startTimer() {
  if (timerInterval !== null) {
    return; // already running, ignore
  }

  sessionData.timerRuns++;
  timerInterval = setInterval(() => {
    timerSeconds--;
    document.getElementById('timer-display').textContent = formatTime(timerSeconds);

    if (timerSeconds === 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      alert("Time's up! You may now check Slack.");
    }
  }, 1000);

  logWithTimestamp("Timer started");
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  logWithTimestamp("Timer stopped");
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerSeconds = 25 * 60;
  document.getElementById('timer-display').textContent = formatTime(timerSeconds);
  logWithTimestamp("Timer reset");
}

// ─── Cloud Sync ────────────────────────────────────────────────────────────

async function syncToCloud() {
  const statusEl = document.getElementById('sync-status');
  statusEl.textContent = "Syncing...";

  try {
    // Simulate network latency with a premium feel
    await new Promise(resolve => setTimeout(resolve, 1500));

    const payload = deepClone(sessionData);
    payload.lastSync = new Date().toISOString();

    // "Sync" to localStorage and call it cloud
    localStorage.setItem('grindmode_data', JSON.stringify(payload));
    sessionData.lastSync = payload.lastSync;

    statusEl.textContent = `✓ Synced at ${new Date().toLocaleTimeString()}`;
    logWithTimestamp("Synced to cloud (localStorage)");
  } catch (err) {
    statusEl.textContent = "✗ Sync failed. The cloud is down (it's your computer).";
    logWithTimestamp(`Sync error: ${err.message}`);
  }
}

// ─── Init ──────────────────────────────────────────────────────────────────

function init() {
  const saved = localStorage.getItem('grindmode_data');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      sessionData = parsed;
      logWithTimestamp("Restored session from cloud");
    } catch (e) {
      logWithTimestamp("Corrupt save data, starting fresh");
    }
  }
}

init();
