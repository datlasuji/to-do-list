# Focus To-Do Pomodoro ⏱️🍅

A productivity-focused **Chrome Extension** that combines a **To-Do List**, **Stopwatch**, and **Pomodoro Timer** to help users stay focused and manage tasks efficiently.

This project was built as a learning + portfolio project using **JavaScript and Chrome Extensions (Manifest V3)**.

---

## ✨ Features

- 📝 Add and manage to-do tasks
- 🗂️ Separate **Deleted Tasks page** with restore option
- ⏱️ **Stopwatch mode**
- 🍅 **Pomodoro mode (25-minute focus timer)**
- 🎯 **Task-based Pomodoro**  
  (select a task → Pomodoro completes → task auto-completed)
- 🔔 Sound notification when Pomodoro finishes
- 💾 Persistent task storage using `chrome.storage`
- 🧠 **Background timer** (continues even if popup closes or page changes)
- 🎨 Clean, minimal UI with background image

---

## 🛠️ Tech Stack

- HTML
- CSS
- JavaScript
- Chrome Extensions API (Manifest V3)

## 🚀 Installation (Local Setup)

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/focus-todo-pomodoro.git

   How It Works

The popup pages (popup.html, deleted.html) handle UI

A background service worker (background.js) runs the timer

Popup communicates with background using chrome.runtime.sendMessage

Tasks and deleted tasks are stored locally using chrome.storage.local

This design ensures the Pomodoro timer keeps running even when:

The popup is closed

The user switches pages inside the extension

Future Improvements

Dark mode

Short & long break timers

Pomodoro statistics

Desktop notifications

Sync across devices


## 📌 How to Use (Before Chrome Web Store Release)

1. Download the project as ZIP from GitHub
2. Extract the folder
3. Open Chrome → `chrome://extensions`
4. Enable **Developer Mode**
5. Click **Load unpacked**
6. Select the project folder
