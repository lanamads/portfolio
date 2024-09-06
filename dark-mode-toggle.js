document.addEventListener("DOMContentLoaded", () => {
    const modeToggle = document.getElementById("mode-toggle");
    const body = document.body;
  
    // Toggle dark mode and switch icon between moon and sun
    const toggleDarkMode = () => {
      body.classList.toggle("dark-mode");
  
      const icon = modeToggle.querySelector("i");
      icon.classList.toggle("fa-moon");
      icon.classList.toggle("fa-sun");
  
      // Save mode preference in localStorage
      const mode = body.classList.contains("dark-mode") ? "dark" : "light";
      localStorage.setItem("mode", mode);
    };
  
    modeToggle.addEventListener("click", toggleDarkMode);
  
    // Load dark mode preference from localStorage
    const storedMode = localStorage.getItem("mode");
    if (storedMode === "dark") {
      body.classList.add("dark-mode");
      modeToggle.querySelector("i").classList.replace("fa-moon", "fa-sun");
    }
  });