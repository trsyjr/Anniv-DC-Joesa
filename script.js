function revealCelebrants() {
  const landing = document.getElementById('landing');
  const celebrants = document.getElementById('celebrants');
  const floating = document.getElementById('floating-images');
  const nav = document.getElementById('nav-header');

  landing.classList.add('hidden');
  celebrants.classList.remove('hidden');
  floating.classList.remove('hidden');
  nav.classList.remove('hidden');

  const music = document.getElementById('bg-music');
  music.play().catch(err => console.log("Audio waiting for user interaction."));

  launchConfetti();
  showFloatingImagesTurn();
  spawnBalloons(15);
}

function goBack() {
  const landing = document.getElementById('landing');
  const celebrants = document.getElementById('celebrants');
  const floating = document.getElementById('floating-images');
  const nav = document.getElementById('nav-header');

  landing.classList.remove('hidden');
  celebrants.classList.add('hidden');
  floating.classList.add('hidden');
  nav.classList.add('hidden');
  
  const extraImages = floating.querySelectorAll('img');
  extraImages.forEach(img => img.remove());
}

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
  if (container.classList.contains('hidden')) return;

  const images = ["./Assets/23.png", "./Assets/Blue.png", "./Assets/Blueblue.png"];

  for (let i = 0; i < quantity; i++) {
    const balloon = document.createElement("img");
    balloon.src = images[Math.floor(Math.random() * images.length)];
    balloon.className = "floating-balloon opacity-0 absolute";

    const size = Math.random() * (120 - 60) + 60;
    balloon.style.width = size + "px";
    balloon.style.left = Math.random() * (container.offsetWidth - size) + "px";
    balloon.style.top = Math.random() * (container.offsetHeight - size) + "px";
    balloon.style.animation = `floatUpBalloon ${Math.random() * 3 + 5}s linear forwards`;

    container.appendChild(balloon);

    setTimeout(() => {
      balloon.classList.remove("opacity-0");
      balloon.classList.add("opacity-100");
    }, 50);

    balloon.addEventListener("animationend", () => balloon.remove());
  }
}

const claImages = [
  "./Assets/DC1.png", "./Assets/DC2.png", "./Assets/DC3.png", 
  "./Assets/DC4.png", "./Assets/DC5.png", "./Assets/DC6.png", 
  "./Assets/DC7.png", "./Assets/DC10.png", "./Assets/DC11.png"
];

function showFloatingImagesTurn() {
  const container = document.getElementById("floating-images");
  if (container.classList.contains('hidden')) return;

  let index = 0;
  const shuffled = [...claImages].sort(() => Math.random() - 0.5);

  function spawnNextImage() {
    if (container.classList.contains('hidden') || index >= shuffled.length) return;

    const img = document.createElement("img");
    img.src = shuffled[index];
    img.className = "floating-balloon opacity-0 absolute";
    const width = Math.random() * (480 - 320) + 320;
    img.style.width = width + "px";
    img.style.left = Math.random() * (container.offsetWidth - width) + "px";
    img.style.animation = `floatUpBalloon ${Math.random() * 2 + 6}s linear forwards`;

    container.appendChild(img);
    setTimeout(() => {
      img.classList.remove("opacity-0");
      img.classList.add("opacity-100");
    }, 50);

    img.addEventListener("animationend", () => img.remove());
    index++;
    setTimeout(spawnNextImage, 1000);
  }
  spawnNextImage();
}