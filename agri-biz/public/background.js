// Array of background images
const images = [
    'bg1.jpg',
    'bg2.jpg',
    'bg3.jpg',
    'bg4.jpg',
    'bg5.jpg',
    'Logo1.png',
    'Logo2.png',




    // Add more image paths as needed
];

// Function to select a random image
function getRandomImage(images) {
    const index = Math.floor(Math.random() * images.length);
    return images[index];
}

// Set the random image as background
document.addEventListener("DOMContentLoaded", () => {
    const bgImage = getRandomImage(images);
    document.body.style.backgroundImage = `url(${bgImage})`;

    // Create a glass effect div
    const glassDiv = document.createElement('div');
    glassDiv.classList.add('glass');
    document.body.appendChild(glassDiv);
});
