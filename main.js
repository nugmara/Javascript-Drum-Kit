import "./style.css";

function playSound(e) {
  let key;
  let audio;

  if (e.type === "keydown") {
    audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  } else if (e.type === "touchstart") {
    key = e.target.closest(".key");
    if (!key) return;
    const dataKey = key.getAttribute("data-key");
    audio = document.querySelector(`audio[data-key="${dataKey}"]`)
  }

  if (!audio) return;

  audio.currentTime = 0;
  audio.play();
  key.classList.add("playing");
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

const keys = document.querySelectorAll(".key");

keys.forEach((key) =>{
  key.addEventListener("transitionend", removeTransition);
  key.addEventListener("touchstart", playSound)
})
window.addEventListener("keydown", playSound);
