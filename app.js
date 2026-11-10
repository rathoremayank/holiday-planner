const STORAGE_KEY = "daylight-events-v1";
const calendarDays = document.querySelector("#calendar-days");
const monthLabel = document.querySelector("#month-label");
const monthSummary = document.querySelector("#month-summary");
const eventForm = document.querySelector("#event-form");
const eventDateInput = document.querySelector("#event-date");
const formMessage = document.querySelector("#form-message");
const themeToggle = document.querySelector("#theme-toggle");
const themeToggleLabel = document.querySelector("#theme-toggle-label");
const themeColor = document.querySelector("#theme-color");
const THEME_STORAGE_KEY = "daylight-theme-v1";
const today = new Date();
let displayedMonth = new Date(today.getFullYear(), today.getMonth(), 1);
let selectedDate = dateKey(today);

const INDIAN_HOLIDAYS = [
  ["2026-01-13", "Lohri"],
  ["2026-01-14", "Makar Sankranti"],
  ["2026-01-14", "Pongal"],
  ["2026-01-23", "Vasant Panchami"],
  ["2026-01-26", "Republic Day"],
  ["2026-02-15", "Maha Shivaratri"],
  ["2026-03-03", "Holika Dahan"],
  ["2026-03-04", "Holi"],
  ["2026-03-19", "Gudi Padwa"],
  ["2026-03-19", "Ugadi"],
  ["2026-03-20", "Eid al-Fitr"],
  ["2026-03-26", "Rama Navami"],
  ["2026-03-31", "Mahavir Jayanti"],
  ["2026-04-03", "Good Friday"],
  ["2026-04-05", "Easter Sunday"],
  ["2026-04-14", "Vaisakhi"],
  ["2026-05-01", "Buddha Purnima"],
  ["2026-05-27", "Eid al-Adha"],
  ["2026-06-17", "Islamic New Year"],
  ["2026-06-26", "Muharram"],
  ["2026-07-29", "Guru Purnima"],
  ["2026-08-15", "Independence Day"],
  ["2026-08-26", "Onam"],
  ["2026-08-26", "Eid-e-Milad"],
  ["2026-08-28", "Raksha Bandhan"],
  ["2026-09-04", "Krishna Janmashtami"],
  ["2026-09-14", "Ganesh Chaturthi"],
  ["2026-10-02", "Gandhi Jayanti"],
  ["2026-10-20", "Dussehra"],
  ["2026-11-08", "Diwali"],
  ["2026-11-24", "Guru Nanak Jayanti"],
  ["2026-12-25", "Christmas Day"],
  ["2027-01-14", "Lohri"],
  ["2027-01-15", "Makar Sankranti"],
  ["2027-01-15", "Pongal"],
  ["2027-01-15", "Guru Gobind Singh Jayanti"],
  ["2027-01-26", "Republic Day"],
  ["2027-02-11", "Vasant Panchami"],
  ["2027-03-06", "Maha Shivaratri"],
  ["2027-03-10", "Eid al-Fitr"],
  ["2027-03-21", "Holika Dahan"],
  ["2027-03-22", "Holi"],
  ["2027-03-26", "Good Friday"],
  ["2027-03-28", "Easter Sunday"],
  ["2027-04-07", "Gudi Padwa"],
  ["2027-04-07", "Ugadi"],
  ["2027-04-14", "Vaisakhi"],
  ["2027-04-15", "Rama Navami"],
  ["2027-04-19", "Mahavir Jayanti"],
  ["2027-05-17", "Eid al-Adha"],
  ["2027-05-20", "Buddha Purnima"],
  ["2027-06-06", "Islamic New Year"],
  ["2027-06-15", "Muharram"],
  ["2027-07-18", "Guru Purnima"],
  ["2027-08-15", "Independence Day"],
  ["2027-08-15", "Eid-e-Milad"],
  ["2027-08-17", "Raksha Bandhan"],
  ["2027-08-25", "Krishna Janmashtami"],
  ["2027-09-04", "Ganesh Chaturthi"],
  ["2027-09-12", "Onam"],
  ["2027-10-02", "Gandhi Jayanti"],
  ["2027-10-09", "Dussehra"],
  ["2027-10-29", "Diwali"],
  ["2027-11-14", "Guru Nanak Jayanti"],
  ["2027-12-25", "Christmas Day"],
].map(([date, title]) => ({
  id: `india-holiday-${date}-${title.toLowerCase().replaceAll(" ", "-")}`,
  title,
  date,
  type: "Holiday",
  notes: "India holiday calendar. Confirm local observance; lunar dates may vary.",
}));

const THAURPRASAD_EVENTS = [
  ["2027-01-01", "Isai Navarsh Aarambh/Happy New Year"],
  ["2027-01-12", "Swami Vivekanand Jayanti"],
  ["2027-01-15", "Makar Sankranti / Pongal / Lohri"],
  ["2027-01-23", "Netaji Subhash Chandra Bose Jayanti"],
  ["2027-01-26", "Republic Day"],
  ["2027-02-11", "Basant Panchami"],
  ["2027-03-06", "Maha Shivratri"],
  ["2027-03-21", "Holika Dahan"],
  ["2027-03-22", "Holi, Dhurandi"],
  ["2027-04-07", "Chaitra Navratra Aarambh"],
  ["2027-04-15", "Shri Ramnavmi"],
  ["2027-04-20", "Shri Hanuman Jayanti"],
  ["2027-05-09", "Akshaya Tritiya"],
  ["2027-05-20", "Buddha Purnima"],
  ["2027-08-15", "Independence Day"],
  ["2027-08-24", "Shri Krishna Janmashtami"],
  ["2027-09-04", "Ganesh Chaturthi"],
  ["2027-09-30", "Shardiya Navratra Aarambh"],
  ["2027-10-02", "Gandhi Jayanti"],
  ["2027-10-09", "Vijaya Dashmi (Dussehra)"],
  ["2027-10-27", "Dhanteras"],
  ["2027-10-29", "Deepawali (Diwali)"],
  ["2027-10-31", "Bhai Dooj"],
  ["2027-12-25", "Christmas Day"],
].map(([date, title]) => ({
  id: `thaurprasad-${date}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`,
  title,
  date,
  type: "Thaurprasad",
}));

const KARNATAKA_HOLIDAYS = [
  ["2026-03-19", "Ugadi"],
  ["2026-04-20", "Basava Jayanti"],
  ["2026-08-21", "Varamahalakshmi Vrata"],
  ["2026-09-13", "Gowri Habba"],
  ["2026-10-19", "Ayudha Puja"],
  ["2026-10-20", "Mysuru Dasara"],
  ["2026-11-01", "Kannada Rajyotsava"],
  ["2027-04-07", "Ugadi"],
  ["2027-05-09", "Basava Jayanti"],
  ["2027-08-20", "Varamahalakshmi Vrata"],
  ["2027-09-03", "Gowri Habba"],
  ["2027-10-08", "Ayudha Puja"],
  ["2027-10-09", "Mysuru Dasara"],
  ["2027-11-01", "Kannada Rajyotsava"],
].map(([date, title]) => ({
  id: `karnataka-holiday-${date}-${title.toLowerCase().replaceAll(" ", "-")}`,
  title,
  date,
  type: "Karnataka",
  notes: "Indicative Karnataka observance; confirm dates against the official state holiday notification.",
}));

const THAURPRASAD_EMOJIS = {
  "Isai Navarsh Aarambh/Happy New Year": "🎉",
  "Swami Vivekanand Jayanti": "🙏",
  "Makar Sankranti / Pongal / Lohri": "🪁",
  "Netaji Subhash Chandra Bose Jayanti": "🇮🇳",
  "Republic Day": "🇮🇳",
  "Basant Panchami": "🌼",
  "Maha Shivratri": "🔱",
  "Holika Dahan": "🔥",
  "Holi, Dhurandi": "🎨",
  "Chaitra Navratra Aarambh": "🌺",
  "Shri Ramnavmi": "🏹",
  "Shri Hanuman Jayanti": "🐒",
  "Akshaya Tritiya": "✨",
  "Buddha Purnima": "🪷",
  "Independence Day": "🇮🇳",
  "Shri Krishna Janmashtami": "🦚",
  "Ganesh Chaturthi": "🐘",
  "Shardiya Navratra Aarambh": "🌺",
  "Gandhi Jayanti": "🕊️",
  "Vijaya Dashmi (Dussehra)": "🏹",
  "Dhanteras": "🪔",
  "Deepawali (Diwali)": "🪔",
  "Bhai Dooj": "🧡",
  "Christmas Day": "🎄",
};

function setTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggleLabel.textContent = isDark ? "Light mode" : "Dark mode";
  themeColor.content = isDark ? "#050606" : "#f7f5fb";
}

function loadTheme() {
  try {
    setTheme(localStorage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light");
  } catch (error) {
    setTheme("light");
    formMessage.textContent = `Your theme preference couldn't be read (${error.message}).`;
    formMessage.classList.add("is-error");
  }
}

themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  } catch (error) {
    formMessage.textContent = `This theme will last for this visit, but couldn't be saved (${error.message}).`;
    formMessage.classList.add("is-error");
  }
});

function dateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isValidEvent(value) {
  return value && typeof value.id === "string" &&
    typeof value.title === "string" && typeof value.date === "string" &&
    ["Holiday", "Plan", "Travel", "Thaurprasad", "Karnataka"].includes(value.type);
}

function loadEvents() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) return [];
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed) || !parsed.every(isValidEvent)) {
      throw new TypeError("Saved calendar data has an unexpected format.");
    }
    return parsed.filter((event) => !event.id.startsWith("starter-"));
  } catch (error) {
    formMessage.textContent = `Your saved calendar couldn't be read (${error.message}). Indian holidays are shown instead.`;
    formMessage.classList.add("is-error");
    return [];
  }
}

let events = loadEvents();
const knownEventIds = new Set(events.map((event) => event.id));
const newSeedEvents = [...INDIAN_HOLIDAYS, ...THAURPRASAD_EVENTS, ...KARNATAKA_HOLIDAYS]
  .filter((seedEvent) => !knownEventIds.has(seedEvent.id));
events.push(...newSeedEvents);
loadTheme();

function saveEvents() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    return true;
  } catch (error) {
    formMessage.textContent = `This event is on the calendar for now, but couldn't be saved (${error.message}).`;
    formMessage.classList.add("is-error");
    return false;
  }
}

function renderCalendar() {
  const year = displayedMonth.getFullYear();
  const month = displayedMonth.getMonth();
  monthLabel.textContent = new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(displayedMonth);

  const monthEvents = events.filter((event) => {
    const eventDate = new Date(`${event.date}T12:00:00`);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month;
  });
  monthSummary.textContent = `${monthEvents.length} ${monthEvents.length === 1 ? "thing" : "things"} to look forward to`;

  const firstDay = new Date(year, month, 1);
  const mondayOffset = (firstDay.getDay() + 6) % 7;
  const gridStart = new Date(year, month, 1 - mondayOffset);
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < 42; index += 1) {
    if (index % 7 === 0) {
      const week = document.createElement("div");
      week.className = "calendar-week";
      week.setAttribute("role", "row");
      fragment.append(week);
    }
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);
    const key = dateKey(date);
    const dayEvents = events
      .filter((event) => event.date === key)
      .sort((first, second) => {
        const priority = { Thaurprasad: 0, Karnataka: 1 };
        return (priority[first.type] ?? 2) - (priority[second.type] ?? 2);
      });
    const dayButton = document.createElement("button");
    dayButton.type = "button";
    dayButton.className = "day-cell";
    dayButton.setAttribute("role", "gridcell");
    dayButton.dataset.date = key;
    dayButton.setAttribute("aria-pressed", String(key === selectedDate));
    if (date.getMonth() !== month) dayButton.classList.add("outside-month");
    if (key === dateKey(today)) {
      dayButton.classList.add("is-today");
      dayButton.setAttribute("aria-current", "date");
    }
    if (key === selectedDate) dayButton.classList.add("is-selected");
    const eventNames = dayEvents.map((event) => `${event.type}: ${event.title}`);
    dayButton.setAttribute("aria-label", `${new Intl.DateTimeFormat("en", { dateStyle: "full" }).format(date)}${eventNames.length ? `, ${eventNames.join(", ")}` : ""}`);

    const number = document.createElement("span");
    number.className = "day-number";
    number.textContent = String(date.getDate());
    dayButton.append(number);

    if (dayEvents.length) {
      const eventList = document.createElement("span");
      eventList.className = "day-events";
      dayEvents.slice(0, 2).forEach((event) => {
        const tag = document.createElement("span");
        tag.className = `event-tag event-tag-${event.type.toLowerCase()}`;
        const emoji = event.type === "Thaurprasad" ? THAURPRASAD_EMOJIS[event.title] : "";
        tag.textContent = emoji ? `${emoji} ${event.title}` : event.title;
        tag.title = `${event.type}: ${event.title}${event.notes ? ` — ${event.notes}` : ""}`;
        eventList.append(tag);
      });
      if (dayEvents.length > 2) {
        const more = document.createElement("span");
        more.className = "more-events";
        more.textContent = `+${dayEvents.length - 2} more`;
        eventList.append(more);
      }
      dayButton.append(eventList);
    }
    fragment.lastElementChild.append(dayButton);
  }

  calendarDays.replaceChildren(fragment);
}

document.querySelector("#previous-month").addEventListener("click", () => {
  displayedMonth = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() - 1, 1);
  renderCalendar();
});

document.querySelector("#next-month").addEventListener("click", () => {
  displayedMonth = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() + 1, 1);
  renderCalendar();
});

document.querySelector("#today-button").addEventListener("click", () => {
  displayedMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  selectedDate = dateKey(today);
  eventDateInput.value = selectedDate;
  renderCalendar();
});

calendarDays.addEventListener("click", (event) => {
  const cell = event.target.closest(".day-cell");
  if (!cell) return;
  selectedDate = cell.dataset.date;
  const [year, month, day] = selectedDate.split("-").map(Number);
  const selected = new Date(year, month - 1, day);
  if (selected.getMonth() !== displayedMonth.getMonth() || selected.getFullYear() !== displayedMonth.getFullYear()) {
    displayedMonth = new Date(selected.getFullYear(), selected.getMonth(), 1);
  }
  eventDateInput.value = selectedDate;
  renderCalendar();
  eventDateInput.focus();
});

eventForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!eventForm.reportValidity()) return;

  const formData = new FormData(eventForm);
  const newEvent = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    title: formData.get("title").trim(),
    date: formData.get("date"),
    type: formData.get("type"),
    notes: formData.get("notes").trim(),
  };
  if (!newEvent.title || !newEvent.date || !["Holiday", "Plan", "Travel", "Thaurprasad", "Karnataka"].includes(newEvent.type)) {
    formMessage.textContent = "Please add a name, date, and event type.";
    formMessage.classList.add("is-error");
    return;
  }

  events.push(newEvent);
  selectedDate = newEvent.date;
  const eventDate = new Date(`${newEvent.date}T12:00:00`);
  displayedMonth = new Date(eventDate.getFullYear(), eventDate.getMonth(), 1);
  formMessage.classList.remove("is-error");
  const saved = saveEvents();
  if (saved) formMessage.textContent = `${newEvent.type} added to your calendar.`;
  eventForm.elements.title.value = "";
  eventForm.elements.notes.value = "";
  renderCalendar();
});

eventDateInput.value = selectedDate;
if (newSeedEvents.length) saveEvents();
renderCalendar();
