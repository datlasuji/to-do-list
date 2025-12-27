document.addEventListener("DOMContentLoaded", () => {

  const isMainPage = document.getElementById("taskList");
  const isDeletedPage = document.getElementById("deletedList");

  let tasks = [];
  let deletedTasks = [];
  let activeTaskIndex = null;

  const alarmSound = new Audio("alarm.mp3");

 
  if (isMainPage) {

    const input = document.getElementById("taskInput");
    const addBtn = document.getElementById("addBtn");
    const taskList = document.getElementById("taskList");
    const openDeleted = document.getElementById("openDeleted");

    addBtn.onclick = () => {
      if (!input.value.trim()) return;
      tasks.push(input.value);
      input.value = "";
      save(renderMain);
    };

    openDeleted.onclick = () => {
      window.location.href = "deleted.html";
    };

    function renderMain() {
      taskList.innerHTML = "";
      tasks.forEach((task, i) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <span class="task-text">${task}</span>
          <span class="delete-x">✖</span>
        `;

        li.querySelector(".task-text").onclick = () => {
          activeTaskIndex = i;
          document.querySelectorAll("li").forEach(el =>
            el.classList.remove("active-task")
          );
          li.classList.add("active-task");
        };

        li.querySelector(".delete-x").onclick = () => {
          deletedTasks.push(task);
          tasks.splice(i, 1);
          activeTaskIndex = null;
          save(renderMain);
        };

        taskList.appendChild(li);
      });
    }

   
    let mode = "stopwatch";
    let seconds = 0;

    const timeEl = document.getElementById("time");
    const startBtn = document.getElementById("start");
    const pauseBtn = document.getElementById("pause");
    const resetBtn = document.getElementById("reset");
    const stopwatchBtn = document.getElementById("stopwatchMode");
    const pomodoroBtn = document.getElementById("pomodoroMode");

    stopwatchBtn.onclick = () => {
      mode = "stopwatch";
      stopwatchBtn.classList.add("active");
      pomodoroBtn.classList.remove("active");
      resetTimer();
    };

    pomodoroBtn.onclick = () => {
      mode = "pomodoro";
      pomodoroBtn.classList.add("active");
      stopwatchBtn.classList.remove("active");
      seconds = 25 * 60;
      updateTime();
    };

    startBtn.onclick = () => {
      chrome.runtime.sendMessage({
        type: "START",
        mode,
        seconds: mode === "stopwatch" ? seconds : seconds || 25 * 60
      });
    };

    pauseBtn.onclick = () => {
      chrome.runtime.sendMessage({ type: "PAUSE" });
    };

    resetBtn.onclick = () => {
      seconds = mode === "stopwatch" ? 0 : 25 * 60;
      updateTime();
      chrome.runtime.sendMessage({ type: "RESET", seconds });
    };

    chrome.runtime.onMessage.addListener((msg) => {

      if (msg.type === "TICK") {
        seconds = msg.seconds;
        updateTime();
      }

      if (msg.type === "DONE") {
        alarmSound.play();

        if (activeTaskIndex !== null) {
          deletedTasks.push(tasks[activeTaskIndex]);
          tasks.splice(activeTaskIndex, 1);
          activeTaskIndex = null;
          save(renderMain);
        }

        alert("Pomodoro completed 🍅");
      }
    });

    function resetTimer() {
      seconds = mode === "stopwatch" ? 0 : 25 * 60;
      updateTime();
    }

    function updateTime() {
      const m = String(Math.floor(seconds / 60)).padStart(2, "0");
      const s = String(seconds % 60).padStart(2, "0");
      timeEl.innerText = `${m}:${s}`;
    }

    updateTime();
  }


  if (isDeletedPage) {

    const deletedList = document.getElementById("deletedList");
    const backBtn = document.getElementById("backBtn");

    function renderDeleted() {
      deletedList.innerHTML = "";
      deletedTasks.forEach((task, i) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <span class="task-text">${task}</span>
          <span class="delete-x">↩</span>
        `;
        li.querySelector(".delete-x").onclick = () => {
          tasks.push(task);
          deletedTasks.splice(i, 1);
          save(renderDeleted);
        };
        deletedList.appendChild(li);
      });
    }

    backBtn.onclick = () => {
      window.location.href = "popup.html";
    };
  }


  function loadData() {
    chrome.storage.local.get(["tasks", "deletedTasks"], (res) => {
      tasks = res.tasks || [];
      deletedTasks = res.deletedTasks || [];
      if (isMainPage) renderMain();
      if (isDeletedPage) renderDeleted();
    });
  }

  function save(cb) {
    chrome.storage.local.set({ tasks, deletedTasks }, cb);
  }

  loadData();
});
