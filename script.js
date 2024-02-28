document.addEventListener("DOMContentLoaded", function () {
  const keys = document.querySelectorAll(".key");
  const sequence = [];
  const secretCode = "asdfghjkl";

  keys.forEach((key) => {
    key.addEventListener("click", playSound);
    key.addEventListener("touchstart", playSound);
  });

  document.addEventListener("keydown", function (e) {
    playSoundByKeyCode(e.keyCode);
    sequence.push(e.key);

    if (sequence.join("").includes(secretCode)) {
      displayMessage("Not quite my tempo");
      setTimeout(() => {
        sequence.length = 0;
      }, 2000);
    }
  });

  keys.forEach((key) =>
    key.addEventListener("transitionend", removeTransition)
  );
});

function playSound(e) {
  const key = e.target;
  const keyCode = key.getAttribute("data-key");
  playSoundByKeyCode(keyCode);
}

function playSoundByKeyCode(keyCode) {
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${keyCode}"]`);

  if (!audio) return;

  audio.currentTime = 0;
  audio.play();

  key.classList.add("playing");
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

function displayMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.textContent = message;
  document.body.appendChild(messageElement);

  setTimeout(() => {
    messageElement.remove();
  }, 4000);
}
