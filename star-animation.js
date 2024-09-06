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
});