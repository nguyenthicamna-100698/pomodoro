const MODES = {
  focus: 25 * 60,
  short: 5 * 60,
  long: 15 * 60,
};
const POMODORO_MINUTES = 25;
const STORAGE_KEY = "pomodoro-focus-stats";
const HISTORY_KEY = "pomodoro-focus-history";
const TODO_KEY = "pomodoro-focus-todo";
const USER_KEY = "pomodoro-focus-user";
const LANG_KEY = "pomodoro-focus-lang";
const THEME_KEY = "pomodoro-focus-theme";
const DEFAULT_AVATAR = "12.jpg";

const I18N = {
  ja: {
    login: "ログイン",
    logout: "ログアウト",
    themeDark: "ダーク",
    themeLight: "ライト",
    lede: "25分集中して、ひとつずつ完了させるシンプルなタイマーです。",
    profile: "自己紹介",
    profileCopy: "ポモドーロで集中時間をつくるのが好きです。雨音を聞きながら、25分ずつ丁寧に進めます。",
    profileAlt: "プロフィール画像",
    loginCopy: "ユーザー名とアバター画像を保存して、次回から自動で表示します。",
    userName: "ユーザー名",
    namePlaceholder: "山田 太郎",
    avatar: "アバター画像",
    cancel: "キャンセル",
    timer: "タイマー",
    modeFocus: "25分集中",
    modeShort: "5分小休憩",
    modeLong: "15分長休憩",
    start: "スタート",
    pause: "一時停止",
    reset: "リセット",
    idle: "待機中",
    running: "進行中",
    paused: "一時停止",
    done: "完了",
    todo: "ミニTo-Do",
    todoEmpty: "未設定",
    todoSet: "セット",
    todoClear: "クリア",
    todoNone: "まだタスクがありません",
    taskName: "今から集中するタスク",
    todoPlaceholder: "履歴書を仕上げる",
    stats: "今日の実績",
    statsCopy: "今日完了したポモドーロ回数です。ブラウザに自動保存されます。",
    todayMinutesLabel: "本日の合計集中時間",
    todayCountLabel: "完了ポモドーロ数",
    minutesUnit: "分",
    weekChart: "過去7日間の達成度",
    weekdays: ["日", "月", "火", "水", "木", "金", "土"],
    bgm: "BGM",
    bgmCopy: "集中用の雨の音をループ再生します。",
    bgmPlay: "雨の音を再生",
    bgmStop: "雨の音を停止",
    bgmOff: "停止中",
    bgmOn: "再生中",
    bgmError: "再生できません",
    close: "閉じる",
    toastFocus: "集中タイム終了！",
    toastBreak: "休憩タイム終了！",
    toastCopy: "よくできました。次のモードへ進みましょう。",
  },
  vi: {
    login: "Đăng nhập",
    logout: "Đăng xuất",
    themeDark: "Tối",
    themeLight: "Sáng",
    lede: "Đồng hồ Pomodoro đơn giản để tập trung 25 phút mỗi phiên.",
    profile: "Giới thiệu",
    profileCopy: "Tôi thích tạo thời gian tập trung bằng Pomodoro, nghe tiếng mưa và hoàn thành từng 25 phút.",
    profileAlt: "Ảnh hồ sơ",
    loginCopy: "Lưu tên và ảnh đại diện để hiển thị tự động lần sau.",
    userName: "Tên người dùng",
    namePlaceholder: "Nguyen Van A",
    avatar: "Ảnh đại diện",
    cancel: "Hủy",
    timer: "Đồng hồ",
    modeFocus: "Tập trung 25 phút",
    modeShort: "Nghỉ ngắn 5 phút",
    modeLong: "Nghỉ dài 15 phút",
    start: "Bắt đầu",
    pause: "Tạm dừng",
    reset: "Đặt lại",
    idle: "Đang chờ",
    running: "Đang chạy",
    paused: "Tạm dừng",
    done: "Hoàn tất",
    todo: "Việc cần làm",
    todoEmpty: "Chưa có",
    todoSet: "Lưu",
    todoClear: "Xóa",
    todoNone: "Chưa có công việc",
    taskName: "Công việc đang tập trung",
    todoPlaceholder: "Hoàn thiện CV",
    stats: "Thành tích hôm nay",
    statsCopy: "Số Pomodoro hoàn thành hôm nay, được lưu tự động.",
    todayMinutesLabel: "Tổng thời gian tập trung",
    todayCountLabel: "Số Pomodoro hoàn thành",
    minutesUnit: "phút",
    weekChart: "Mức hoàn thành 7 ngày",
    weekdays: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
    bgm: "Nhạc nền",
    bgmCopy: "Phát tiếng mưa để tập trung.",
    bgmPlay: "Phát tiếng mưa",
    bgmStop: "Dừng tiếng mưa",
    bgmOff: "Đã dừng",
    bgmOn: "Đang phát",
    bgmError: "Không phát được",
    close: "Đóng",
    toastFocus: "Hết giờ tập trung!",
    toastBreak: "Hết giờ nghỉ!",
    toastCopy: "Làm tốt lắm. Hãy chuyển sang chế độ tiếp theo.",
  },
};

const timeDisplay = document.getElementById("time-display");
const progressBar = document.getElementById("progress-bar");
const timerStatus = document.getElementById("timer-status");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const rainAudio = document.getElementById("rain-audio");
const bgmBtn = document.getElementById("bgm-btn");
const bgmStatus = document.getElementById("bgm-status");
const statsDisplay = document.getElementById("stats-display");
const todayMinutes = document.getElementById("today-minutes");
const todayCount = document.getElementById("today-count");
const todayLabel = document.getElementById("today-label");
const weekChart = document.getElementById("week-chart");
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoStatus = document.getElementById("todo-status");
const todoTitle = document.getElementById("todo-title");
const todoClear = document.getElementById("todo-clear");
const chimeAudio = document.getElementById("chime-audio");
const completeToast = document.getElementById("complete-toast");
const toastTitle = document.getElementById("toast-title");
const toastCopy = document.getElementById("toast-copy");
const toastClose = document.getElementById("toast-close");
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const userChip = document.getElementById("user-chip");
const userAvatar = document.getElementById("user-avatar");
const userName = document.getElementById("user-name");
const loginModal = document.getElementById("login-modal");
const loginForm = document.getElementById("login-form");
const loginName = document.getElementById("login-name");
const loginAvatar = document.getElementById("login-avatar");
const loginCancel = document.getElementById("login-cancel");
const themeBtn = document.getElementById("theme-btn");
const langButtons = document.querySelectorAll("[data-lang]");
const modeButtons = document.querySelectorAll("[data-mode]");

let currentMode = "focus";
let currentLang = localStorage.getItem(LANG_KEY) === "vi" ? "vi" : "ja";
let currentTheme = localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light";
let remainingSeconds = MODES[currentMode];
let timerId = null;
let isRunning = false;
let timerState = "idle";

function t(key) {
  return I18N[currentLang][key];
}

function applyI18n() {
  document.documentElement.lang = currentLang === "vi" ? "vi" : "ja";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
    el.alt = t(el.dataset.i18nAlt);
  });
  langButtons.forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.lang === currentLang);
  });
  renderThemeButton();
  renderTimerStatus();
  renderBgmLabels();
  renderTodo();
  renderStats();
}

function renderThemeButton() {
  themeBtn.setAttribute("aria-pressed", String(currentTheme === "dark"));
  themeBtn.querySelector("span").textContent =
    currentTheme === "dark" ? t("themeLight") : t("themeDark");
}

function applyTheme() {
  document.documentElement.dataset.theme = currentTheme;
  localStorage.setItem(THEME_KEY, currentTheme);
  renderThemeButton();
}

function todayKey() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function shiftDate(base, offset) {
  const date = new Date(`${base}T00:00:00`);
  date.setDate(date.getDate() + offset);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function loadHistory() {
  let history = {};
  try {
    history = JSON.parse(localStorage.getItem(HISTORY_KEY) || "{}") || {};
  } catch {
    history = {};
  }
  try {
    const legacy = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (legacy && legacy.date && typeof legacy.count === "number") {
      const current = history[legacy.date] || { count: 0, minutes: 0 };
      history[legacy.date] = {
        count: Math.max(current.count, legacy.count),
        minutes: Math.max(current.minutes, legacy.count * POMODORO_MINUTES),
      };
    }
  } catch {
    /* ignore */
  }
  return history;
}

function saveHistory(history) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function loadStats() {
  const history = loadHistory();
  const date = todayKey();
  const today = history[date] || { count: 0, minutes: 0 };
  return { date, count: today.count, minutes: today.minutes };
}

function saveStats(stats) {
  const history = loadHistory();
  history[stats.date] = { count: stats.count, minutes: stats.minutes };
  saveHistory(history);
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: stats.date, count: stats.count }));
}

function renderStats() {
  const stats = loadStats();
  statsDisplay.textContent = `🍅 × ${stats.count}`;
  todayCount.textContent = String(stats.count);
  todayMinutes.innerHTML = `${stats.minutes}<span class="unit">${t("minutesUnit")}</span>`;
  todayLabel.textContent = stats.date.replaceAll("-", "/");
  renderWeekChart();
}

function renderWeekChart() {
  const history = loadHistory();
  const today = todayKey();
  const days = Array.from({ length: 7 }, (_, i) => shiftDate(today, i - 6));
  const maxCount = Math.max(1, ...days.map((day) => (history[day] || {}).count || 0));
  weekChart.innerHTML = days
    .map((day) => {
      const count = (history[day] || {}).count || 0;
      const height = Math.max(8, Math.round((count / maxCount) * 100));
      const label = t("weekdays")[new Date(`${day}T00:00:00`).getDay()];
      return `<div class="chart-col"><div class="chart-bar-wrap"><div class="chart-bar${day === today ? " is-today" : ""}" style="height:${height}%"></div></div><span class="chart-value">${count}</span><span class="chart-day">${label}</span></div>`;
    })
    .join("");
}

function loadTodo() {
  return localStorage.getItem(TODO_KEY) || "";
}

function renderTodo() {
  const name = loadTodo();
  if (!name) {
    todoStatus.textContent = t("todoEmpty");
    todoTitle.textContent = t("todoNone");
    return;
  }
  todoStatus.textContent = t("running");
  todoTitle.textContent = name;
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function currentDuration() {
  return MODES[currentMode];
}

function renderTimer() {
  timeDisplay.textContent = formatTime(remainingSeconds);
  const elapsed = currentDuration() - remainingSeconds;
  progressBar.style.width = `${(elapsed / currentDuration()) * 100}%`;
}

function renderTimerStatus() {
  timerStatus.textContent = t(timerState);
  timerStatus.classList.toggle("is-running", timerState === "running");
}

function clearTimer() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
}

function setMode(mode) {
  currentMode = mode;
  modeButtons.forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.mode === mode);
  });
  resetTimer();
}

function completeSession() {
  clearTimer();
  isRunning = false;
  remainingSeconds = currentDuration();
  timerState = "done";
  renderTimer();
  renderTimerStatus();

  if (currentMode === "focus") {
    const stats = loadStats();
    stats.date = todayKey();
    stats.count += 1;
    stats.minutes += POMODORO_MINUTES;
    saveStats(stats);
    renderStats();
  }

  toastTitle.textContent = currentMode === "focus" ? t("toastFocus") : t("toastBreak");
  toastCopy.textContent = t("toastCopy");
  completeToast.hidden = false;
  chimeAudio.currentTime = 0;
  chimeAudio.play().catch(() => {});
}

function tick() {
  remainingSeconds -= 1;
  if (remainingSeconds <= 0) {
    completeSession();
    return;
  }
  renderTimer();
}

function startTimer() {
  if (isRunning) {
    return;
  }
  clearTimer();
  isRunning = true;
  timerState = "running";
  renderTimerStatus();
  timerId = setInterval(tick, 1000);
}

function pauseTimer() {
  clearTimer();
  isRunning = false;
  timerState = "paused";
  renderTimerStatus();
}

function resetTimer() {
  clearTimer();
  isRunning = false;
  remainingSeconds = currentDuration();
  timerState = "idle";
  renderTimer();
  renderTimerStatus();
}

function renderBgmLabels() {
  const playing = !rainAudio.paused;
  bgmBtn.textContent = playing ? t("bgmStop") : t("bgmPlay");
  bgmStatus.textContent = playing ? t("bgmOn") : t("bgmOff");
}

async function toggleBgm() {
  if (rainAudio.paused) {
    try {
      await rainAudio.play();
      bgmBtn.classList.add("is-playing");
      bgmBtn.setAttribute("aria-pressed", "true");
    } catch {
      bgmStatus.textContent = t("bgmError");
      return;
    }
  } else {
    rainAudio.pause();
    bgmBtn.classList.remove("is-playing");
    bgmBtn.setAttribute("aria-pressed", "false");
  }
  renderBgmLabels();
}

function loadUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || "null");
  } catch {
    return null;
  }
}

function renderUser() {
  const user = loadUser();
  if (!user || !user.name) {
    loginBtn.classList.remove("is-hidden");
    userChip.classList.add("is-hidden");
    return;
  }
  loginBtn.classList.add("is-hidden");
  userChip.classList.remove("is-hidden");
  userName.textContent = user.name;
  userAvatar.src = user.avatar || DEFAULT_AVATAR;
  userAvatar.alt = user.name;
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentLang = btn.dataset.lang;
    localStorage.setItem(LANG_KEY, currentLang);
    applyI18n();
  });
});

themeBtn.addEventListener("click", () => {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme();
});

modeButtons.forEach((btn) => {
  btn.addEventListener("click", () => setMode(btn.dataset.mode));
});

loginBtn.addEventListener("click", () => {
  loginForm.reset();
  loginModal.showModal();
});

loginCancel.addEventListener("click", () => loginModal.close());

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = loginName.value.trim();
  if (!name) {
    return;
  }
  let avatar = DEFAULT_AVATAR;
  if (loginAvatar.files[0]) {
    avatar = await fileToDataUrl(loginAvatar.files[0]);
  }
  localStorage.setItem(USER_KEY, JSON.stringify({ name, avatar }));
  renderUser();
  loginModal.close();
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem(USER_KEY);
  renderUser();
});

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = todoInput.value.trim();
  if (!name) {
    return;
  }
  localStorage.setItem(TODO_KEY, name);
  todoInput.value = "";
  renderTodo();
});

todoClear.addEventListener("click", () => {
  localStorage.removeItem(TODO_KEY);
  renderTodo();
});

toastClose.addEventListener("click", () => {
  completeToast.hidden = true;
});

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
bgmBtn.addEventListener("click", toggleBgm);

applyTheme();
applyI18n();
renderTimer();
renderUser();
