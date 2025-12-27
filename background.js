let timer = null;
let seconds = 0;
let mode = "stopwatch";

chrome.runtime.onMessage.addListener((msg) => {

  if (msg.type === "START") {
    if (timer) return;

    mode = msg.mode;
    seconds = msg.seconds;

    timer = setInterval(() => {
      if (mode === "stopwatch") {
        seconds++;
      } else {
        seconds--;
        if (seconds <= 0) {
          clearInterval(timer);
          timer = null;
          chrome.runtime.sendMessage({ type: "DONE" });
          return;
        }
      }

      chrome.runtime.sendMessage({
        type: "TICK",
        seconds
      });
    }, 1000);
  }

  if (msg.type === "PAUSE") {
    clearInterval(timer);
    timer = null;
  }

  if (msg.type === "RESET") {
    clearInterval(timer);
    timer = null;
    seconds = msg.seconds;
  }
});
