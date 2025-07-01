const videoSources = [
  "videos/video1.mp4",
  "videos/video2.mp4",
  "videos/video3.mp4",
  "videos/video4.mp4",
  "videos/video5.mp4"
];

let currentIndex = 0;
let isScrolling = false;
let activeVideo = "A";
let touchStartY = 0;
let touchEndY = 0;

const videoA = document.getElementById("videoA");
const videoB = document.getElementById("videoB");
const endMessage = document.getElementById("endMessage");

function getInactiveVideo() {
  return activeVideo === "A" ? videoB : videoA;
}

function getActiveVideo() {
  return activeVideo === "A" ? videoA : videoB;
}

function showEndMessage() {
  endMessage.classList.add("show");
}

function hideEndMessage() {
  endMessage.classList.remove("show");
}

function playVideo(index) {
  const nextVideo = getInactiveVideo();
  const currentVideo = getActiveVideo();

  nextVideo.src = videoSources[index];
  nextVideo.currentTime = 0;
  nextVideo.play();

  nextVideo.classList.add("active");
  currentVideo.classList.remove("active");

  activeVideo = activeVideo === "A" ? "B" : "A";
}

function handleScroll(e) {
  if (isScrolling) return;

  isScrolling = true;
  const delta = e.deltaY;

  if (delta > 0) {
    // Scroll up
    if (currentIndex < videoSources.length - 1) {
      currentIndex++;
      playVideo(currentIndex);
      hideEndMessage();
    } else {
      showEndMessage();
    }
  } else if (delta < 0) {
    // Scroll down
    if (currentIndex > 0) {
      currentIndex--;
      playVideo(currentIndex);
      hideEndMessage();
    }
  }

  setTimeout(() => {
    isScrolling = false;
  }, 500);
}

function handleTouchStart(e) {
  touchStartY = e.changedTouches[0].screenY;
}

function handleTouchEnd(e) {
  touchEndY = e.changedTouches[0].screenY;
  handleTouchGesture();
}

function handleTouchGesture() {
  const threshold = 50; // Minimum swipe distance
  const delta = touchStartY - touchEndY;

  if (Math.abs(delta) < threshold) return;

  if (delta > 0) {
    // Swipe up
    if (currentIndex < videoSources.length - 1) {
      currentIndex++;
      playVideo(currentIndex);
      hideEndMessage();
    } else {
      showEndMessage();
    }
  } else {
    // Swipe down
    if (currentIndex > 0) {
      currentIndex--;
      playVideo(currentIndex);
      hideEndMessage();
    }
  }
}

// Disable right-click
window.addEventListener("contextmenu", e => e.preventDefault());
window.addEventListener("wheel", handleScroll, { passive: true });
window.addEventListener("touchstart", handleTouchStart, { passive: true });
window.addEventListener("touchend", handleTouchEnd, { passive: true });

// Initial load
videoA.src = videoSources[currentIndex];
videoA.classList.add("active");
videoA.play();
