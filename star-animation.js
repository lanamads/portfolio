document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".banner");

  // Number of randomly scattered dots
  const numberOfDots = 50; 

  // Create and scatter the dots
  const scatterDots = () => {
    for (let i = 0; i < numberOfDots; i++) {
      const dot = document.createElement("div");
      dot.classList.add("dot");

      // Randomize position within the banner
      const randomX = Math.random() * 100; // Percent-based position
      const randomY = Math.random() * 100;

      dot.style.left = `${randomX}%`;
      dot.style.top = `${randomY}%`;

      header.appendChild(dot);
    }
  };

  // Check the mouses proximity to the placed stars (dots)
  const checkProximity = (dot, mouseX, mouseY, radius = 10) => {
    const dotRect = dot.getBoundingClientRect();
    const dotCenterX = dotRect.left + dotRect.width / 2;
    const dotCenterY = dotRect.top + dotRect.height / 2;

    const distance = Math.sqrt(
      Math.pow(dotCenterX - mouseX, 2) + Math.pow(dotCenterY - mouseY, 2)
    );

    return distance < radius; // Check if mouse is within the radius of the star
  };

  const addStarAnimation = (dot) => {
    const newElement = document.createElement("div");
    newElement.classList.add("star");

    // Position the star at the dot's location
    const dotRect = dot.getBoundingClientRect();
    newElement.style.left = `${dotRect.left + dotRect.width / 2}px`;
    newElement.style.top = `${dotRect.top + dotRect.height / 2}px`;

    // Remove the star and show the dot again after animation
    newElement.addEventListener("animationend", (event) => {
      if (event.animationName === "falling") {
        newElement.remove();
        dot.style.opacity = 1; // Reappear the dot after the animation
      }
    });

    header.appendChild(newElement);
  };

  const handleMouseMove = (e) => {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot) => {
      if (checkProximity(dot, e.clientX, e.clientY)) {
        if (dot.style.opacity !== "0") { // Only trigger if the dot is visible
          dot.style.opacity = 0; // Hide the dot
          addStarAnimation(dot); // Add star animation
        }
      }
    });
  };

  // Initialize the scattered dots
  scatterDots();

  // Add mousemove event listener for interaction
  header.addEventListener("mousemove", handleMouseMove);
});