const toggleButton = document.getElementById("toggle-button");
const shortDescription = document.getElementById("short-description");
const fullDescription = document.getElementById("full-description");

toggleButton.addEventListener("click", function () {
    if (fullDescription.style.display === "none") {
        fullDescription.style.display = "inline";
        shortDescription.style.display = "none";
        toggleButton.textContent = "Show Less";
    } else {
        fullDescription.style.display = "none";
        shortDescription.style.display = "inline";
        toggleButton.textContent = "Show More";
    }
});