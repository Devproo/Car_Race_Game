// Select the game area and the car elements from the DOM
const gameArea = document.getElementById("gameArea");
const car = document.getElementById("car");

// Set initial car position (horizontally centered)
let carPosition = 135;

// Array to store the obstacles
let obstacles = [];

// Variables to manage game intervals and state
let gameInterval;
let obstacleInterval;
let isGameOver = false;

// Event listener for keyboard input (arrow keys)
document.addEventListener("keydown", (e) => {
  if (isGameOver) return; // Prevent car movement if the game is over

  // Move car left or right based on arrow key pressed
  if (e.key === "ArrowLeft" && carPosition > 0) {
    carPosition -= 10; // Move car left
    console.log("Moving left");
  } else if (e.key === "ArrowRight" && carPosition < 270) {
    carPosition += 10; // Move car right
    console.log("Moving right");
  }

  // Update car's position on the screen
  car.style.left = carPosition + "px";
});

// Function to create a new obstacle
function createObstacle() {
  // Create a new div element for the obstacle
  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle"); // Add the 'obstacle' class for styling

  // Set a random horizontal position for the obstacle
  obstacle.style.left = Math.floor(Math.random() * 270) + "px";

  // Position the obstacle above the visible area (to fall down)
  obstacle.style.top = "-60px";

  // Add the obstacle to the game area and store it in the obstacles array
  gameArea.appendChild(obstacle);
  obstacles.push(obstacle);
}

// Function to move obstacles down the screen
function moveObstacles() {
  // Iterate over each obstacle
  obstacles.forEach((obstacle, index) => {
    // Get the current vertical position of the obstacle
    let obstacleTop = parseInt(obstacle.style.top);

    // Move the obstacle down by 5 pixels
    obstacleTop += 5;
    obstacle.style.top = obstacleTop + "px";

    // Collision detection: Check if the obstacle hits the car
    if (
      obstacleTop >= 520 && // Obstacle is at the same vertical position as the car
      obstacleTop <= 580 && // (adjusted for the car's height)
      parseInt(obstacle.style.left) >= carPosition && // Obstacle is horizontally aligned with the car
      parseInt(obstacle.style.left) <= carPosition + 30
    ) {
      endGame(); // End the game if there's a collision
    }

    // Remove the obstacle if it has moved out of the screen
    if (obstacleTop > 600) {
      gameArea.removeChild(obstacle);
      obstacles.splice(index, 1); // Remove obstacle from the array
    }
  });
}

// Function to start the game
function startGame() {
  // Move obstacles every 20 milliseconds
  gameInterval = setInterval(moveObstacles, 20);

  // Create a new obstacle every 2 seconds
  obstacleInterval = setInterval(createObstacle, 2000);
}

// Function to end the game
function endGame() {
  // Stop the intervals controlling obstacle movement and creation
  clearInterval(gameInterval);
  clearInterval(obstacleInterval);

  // Set the game over flag to true
  isGameOver = true;

  // Alert the player that the game is over
  alert("Game Over! Reload to play again.");
}

// Start the game when the script loads
startGame();
