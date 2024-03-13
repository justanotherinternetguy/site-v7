const carouselText = [
  { text: "Apple", color: "red" },
  { text: "Orange", color: "orange" },
  { text: "Lemon", color: "yellow" },
];

document.addEventListener("DOMContentLoaded", async function () {
  typeSentence(
    "welcome to justanotherinternetguy's corner of the wwww",
    "#sentence"
  );
  //   carousel(carouselText, "#feature-text");
});

async function typeSentence(sentence, eleRef, minDelay = 30, maxDelay = 100) {
  const letters = sentence.split("");
  let i = 0;
  while (i < letters.length) {
    const delay =
      Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay; // Random delay between minDelay and maxDelay
    await waitForMs(delay);
    document.querySelector(eleRef).textContent += letters[i];
    i++;
  }
  return;
}

async function deleteSentence(eleRef) {
  const sentence = document.querySelector(eleRef).textContent;
  const letters = sentence.split("");
  let i = 0;
  while (letters.length > 0) {
    await waitForMs(100);
    letters.pop();
    document.querySelector(eleRef).textContent = letters.join("");
  }
}

async function carousel(carouselList, eleRef) {
  var i = 0;
  while (true) {
    updateFontColor(eleRef, carouselList[i].color);
    await typeSentence(carouselList[i].text, eleRef);
    await waitForMs(1500);
    await deleteSentence(eleRef);
    await waitForMs(500);
    i++;
    if (i >= carouselList.length) {
      i = 0;
    }
  }
}

function updateFontColor(eleRef, color) {
  document.querySelector(eleRef).style.color = color;
}

function waitForMs(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

window.onload = function () {
  setTimeout(function () {
    var socket = document.getElementById("socket");
    socket.style.opacity = 0; // Set opacity to 0 for transition
    setTimeout(function () {
      socket.remove(); // Remove the socket element after the transition completes
      document.querySelector("main").classList.remove("gone");
    }, 1000); // Wait for 1 second, which is the same duration as the CSS transition
  }, 3000);
};
