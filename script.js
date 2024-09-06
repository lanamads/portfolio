document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".banner");

  const coordinates = {
    x: undefined,
    y: undefined,
  };

  const addElement = () => {
    const newElement = document.createElement("div");
    newElement.classList.add("star");

    newElement.style.left = coordinates.x + "px";
    newElement.style.top = coordinates.y + "px";

    // Remove the star element after the falling animation ends
    newElement.addEventListener("animationend", (event) => {
      if (event.animationName === "falling") {
        newElement.remove();
      }
    });

    header.appendChild(newElement);
  };

  const updateCoordinates = (e) => {
    if (coordinates.x === undefined || coordinates.y === undefined) {
      coordinates.x = e.x;
      coordinates.y = e.y;
      addElement();
    }

    if (
      Math.abs(coordinates.x - e.x) > 50 ||
      Math.abs(coordinates.y - e.y) > 50
    ) {
      coordinates.x = e.x;
      coordinates.y = e.y;
      addElement();
    }
  };

  header.addEventListener("mousemove", (e) => {
    updateCoordinates(e);
  });

  // Scripts for toggling between light and dark mode
  const modeToggle = document.getElementById("mode-toggle");
  const body = document.body;

  modeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Change the icon from moon to sun
    const icon = modeToggle.querySelector("i");
    icon.classList.toggle("fa-moon");
    icon.classList.toggle("fa-sun");
  });

  // Preserve mode preference in localStorage
  window.onload = () => {
    if (localStorage.getItem("mode") === "dark") {
      body.classList.add("dark-mode");
      modeToggle.querySelector("i").classList.replace("fa-moon", "fa-sun");
    }
  };

  body.addEventListener("classChange", () => {
    const mode = body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("mode", mode);
  });
});
