function revealCelebrants() {
  const landing = document.getElementById('landing');
  const celebrants = document.getElementById('celebrants');
  const appreciationCla = document.getElementById('appreciation-cla');
  const floating = document.getElementById('floating-images');
  const nav = document.getElementById('nav-header');

  // Show content
  landing.classList.add('hidden');
  celebrants.classList.remove('hidden');
  appreciationCla.classList.remove('hidden');
  floating.classList.remove('hidden');
  nav.classList.remove('hidden');

  const music = document.getElementById('bg-music');
  music.play();

  launchConfetti();
  showFloatingImagesTurn();
  spawnBalloons(15);
}

function goBack() {
  const landing = document.getElementById('landing');
  const celebrants = document.getElementById('celebrants');
  const appreciationCla = document.getElementById('appreciation-cla');
  const floating = document.getElementById('floating-images');
  const nav = document.getElementById('nav-header');

  // Reset visibility
  landing.classList.remove('hidden');
  celebrants.classList.add('hidden');
  appreciationCla.classList.add('hidden');
  floating.classList.add('hidden');
  nav.classList.add('hidden');

  // Optional: Pause music or keep it playing
  // const music = document.getElementById('bg-music');
  // music.pause();
  // music.currentTime = 0;
  
  // Clean up any remaining floating images
  const extraImages = floating.querySelectorAll('img');
  extraImages.forEach(img => img.remove());
}

/* --- THE REST OF YOUR JS REMAINS THE SAME --- */

function launchConfetti() {
  const colors = ['#3B82F6', '#60A5FA', '#93C5FD', '#1D4ED8', '#0EA5E9'];
  for (let i = 0; i < 120; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = Math.random() * 100 + 'vh';
    const size = Math.random() * 8 + 4;
    confetti.style.width = size + 'px';
    confetti.style.height = size + 'px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);
  }
}

function spawnBalloons(quantity = 5) {
  const container = document.getElementById("floating-images");
  if (container.classList.contains('hidden')) return; // Stop if hidden

  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  const images = ["Assets/23.png", "Assets/Blue.png", "Assets/Blueblue.png"];

  for (let i = 0; i < quantity; i++) {
    const balloon = document.createElement("img");
    balloon.src = images[Math.floor(Math.random() * images.length)];
    balloon.className = "floating-balloon opacity-0 absolute";

    const size = Math.random() * (120 - 60) + 60;
    balloon.style.width = size + "px";
    balloon.style.left = Math.random() * (containerWidth - size) + "px";
    balloon.style.top = Math.random() * (containerHeight - size) + "px";
    balloon.style.animation = `floatUpBalloon ${Math.random() * 3 + 5}s linear forwards`;

    container.appendChild(balloon);

    setTimeout(() => {
      balloon.classList.remove("opacity-0");
      balloon.classList.add("opacity-100");
    }, 50);

    balloon.addEventListener("animationend", () => {
      balloon.remove();
      if (!container.classList.contains('hidden')) {
        setTimeout(() => spawnBalloons(1), Math.random() * 2000 + 500);
      }
    });
  }
}

const claImages = [
  "Assets/DC1.JPG", "Assets/DC2.JPG", "Assets/DC3.JPG", "Assets/DC4.jpg",
  "Assets/DC5.JPG", "Assets/DC6.JPG", "Assets/DC7.jpg", "Assets/DC8.jpg",
  "Assets/DC10.JPG", "Assets/DC11.jpg"
];

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function showFloatingImagesTurn() {
  const container = document.getElementById("floating-images");
  if (container.classList.contains('hidden')) return;

  const containerWidth = container.offsetWidth;
  const images = shuffleArray(claImages);
  let index = 0;

  function spawnNextImage() {
    if (container.classList.contains('hidden')) return;
    if (index >= images.length) {
      setTimeout(showFloatingImagesTurn, 1500);
      return;
    }

    const img = document.createElement("img");
    img.src = images[index];
    img.className = "floating-balloon opacity-0 absolute";
    const width = Math.random() * (480 - 320) + 320;
    img.style.width = width + "px";
    img.style.left = Math.random() * (containerWidth - width) + "px";
    img.style.animation = `floatUpBalloon ${Math.random() * 2 + 6}s linear forwards`;

    container.appendChild(img);
    setTimeout(() => {
      img.classList.remove("opacity-0");
      img.classList.add("opacity-100");
    }, 50);

    img.addEventListener("animationend", () => img.remove());
    index++;
    setTimeout(spawnNextImage, Math.random() * 200 + 800);
  }
  spawnNextImage();
}