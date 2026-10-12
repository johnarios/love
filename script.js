const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");
const mainContainer = document.getElementById("main-container");
const successScreen = document.getElementById("success-screen");

let yesScale = 1;
let noScale = 1;
let count = 0;

const quotes = [
    "🥺 Please don't break my heart.",
    "❤️ Are you really sure?",
    "💖 Give love a chance.",
    "🥹 My heart skipped a beat.",
    "💕 I'll keep asking until you smile.",
    "😢 My heart says you meant Yes.",
    "🌹 Love deserves one chance.",
    "🥰 You look prettier when you press Yes.",
    "💘 My heart chose you already.",
    "❤️ The Yes button looks better."
];

function moveButton() {
    count++;

    // Generate random distances between -150px and 150px
    const randomX = (Math.random() * 300) - 150;
    const randomY = (Math.random() * 300) - 150;
    
    // Add a random rotation for a "frantic" feel
    const randomRotate = (Math.random() * 30) - 15; 

    yesScale += 0.2;
    noScale -= 0.05;

    if (noScale < 0.15) noScale = 0.15;

    // Apply hardware-accelerated transforms
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px) scale(${noScale}) rotate(${randomRotate}deg)`;
    yesBtn.style.transform = `scale(${yesScale})`;

    message.innerHTML = quotes[Math.floor(Math.random() * quotes.length)];

    if (count >= 8) {
        yesBtn.style.position = "fixed";
        yesBtn.style.left = "50%";
        yesBtn.style.top = "50%";
        yesBtn.style.transform = "translate(-50%, -50%) scale(4)";
        yesBtn.style.boxShadow = "0 0 50px 20px rgba(0, 255, 150, 0.6)";
        yesBtn.style.zIndex = "999";
    }
}

noBtn.addEventListener("mouseover", moveButton);

noBtn.addEventListener("touchstart", function(e){
    e.preventDefault();
    moveButton();
});

yesBtn.addEventListener("click", () => {
    // Hide main container and show success screen
    mainContainer.style.display = "none";
    successScreen.classList.remove("hidden");

    document.body.style.background = "linear-gradient(135deg, #ff0844, #ffb199)";

    // Cinematic falling hearts
    for(let i = 0; i < 80; i++){
        const heart = document.createElement("div");

        // Mix up the falling emojis
        heart.innerHTML = ["❤️", "💖", "💕", "✨"][Math.floor(Math.random() * 4)];

        heart.style.position = "fixed";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.top = "-50px";
        heart.style.fontSize = (15 + Math.random() * 35) + "px";
        heart.style.opacity = Math.random() * 0.8 + 0.2;
        
        // Add random horizontal sway via CSS variables
        heart.style.setProperty('--sway', (Math.random() * 100 - 50) + 'px');
        
        const duration = 4 + Math.random() * 5;
        heart.style.animation = `cinematicFall ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;
        heart.style.animationDelay = (Math.random() * 2) + "s";

        document.body.appendChild(heart);
    }

    function moveButton() {
    count++;

    // Dynamically calculate screen size so it works perfectly on Phones, iPads, and Windows
    // We calculate the maximum safe distance it can move from its original center position
    const maxDistanceX = (window.innerWidth / 2) - (noBtn.offsetWidth / 2) - 30; // 30px safety padding
    const maxDistanceY = (window.innerHeight / 2) - (noBtn.offsetHeight / 2) - 30;

    // Generate a random position within the safe screen boundaries
    const randomX = (Math.random() * maxDistanceX * 2) - maxDistanceX;
    const randomY = (Math.random() * maxDistanceY * 2) - maxDistanceY;
    
    // Add a random rotation for a "frantic" feel
    const randomRotate = (Math.random() * 30) - 15; 

    yesScale += 0.2;
    noScale -= 0.05;

    if (noScale < 0.15) noScale = 0.15;

    // Apply hardware-accelerated transforms securely inside the viewport boundaries
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px) scale(${noScale}) rotate(${randomRotate}deg)`;
    yesBtn.style.transform = `scale(${yesScale})`;

    message.innerHTML = quotes[Math.floor(Math.random() * quotes.length)];

    if (count >= 8) {
        yesBtn.style.position = "fixed";
        yesBtn.style.left = "50%";
        yesBtn.style.top = "50%";
        
        // Use a slightly smaller scale for phones so it doesn't overflow
        const finalScale = window.innerWidth < 500 ? 2.5 : 4;
        yesBtn.style.transform = `translate(-50%, -50%) scale(${finalScale})`;
        
        yesBtn.style.boxShadow = "0 0 50px 20px rgba(0, 255, 150, 0.6)";
        yesBtn.style.zIndex = "999";
    }
}
});