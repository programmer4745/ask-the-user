const flirtingLines = [
  "Chalo na yaar, please! 🙏",
  "Man jao Madamji... 🥺",
  "Ek baar haan bol do na, 🥺",
  "Itna bhi bhaav mt khao yaar 😅",
  "You’re the most beautiful person I’ve ever met. 😍",
  "Your smile could light up the entire travel spot! 😊",
  "Being around you feels like a dream come true. 🥰",
  "Just say yes and let me treat you like the queen you are! 👑",
];

let yesCount = 0;
let noCount = 0;
let messageIndex = 0;

const yesButton = document.getElementById("yes-btn");
const noButton = document.getElementById("no-btn");
const response = document.getElementById("response");

yesButton.addEventListener("click", () => {
  yesCount++;
  response.textContent = `Yay! Thank You Future Wife 💖`;
  response.classList.remove("hidden");
  sendNotification();
});

noButton.addEventListener("click", () => {
  if (messageIndex < flirtingLines.length) {
    response.textContent = flirtingLines[messageIndex];
    messageIndex++;
  } else {
    response.textContent = "Chalo na Future Wife";
    moveNoButton();
  }
  noCount++;
  response.classList.remove("hidden");
  sendNotification();
});

function moveNoButton() {
  const container = document.querySelector(".container");
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  const randomX = Math.random() * (containerWidth - noButton.offsetWidth);
  const randomY = Math.random() * (containerHeight - noButton.offsetHeight);

  noButton.style.position = "absolute";
  noButton.style.left = `${randomX}px`;
  noButton.style.top = `${randomY}px`;
}

function sendNotification() {
  fetch("http://localhost:3000/send-sms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ yesCount, noCount }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("SMS sent successfully!");
    })
    .catch((error) => {
      console.error("Error sending SMS:", error);
    });
}
