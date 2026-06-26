const button = document.getElementById("runButton");

button.addEventListener("mouseenter", () => {

    const x = Math.random() * (window.innerWidth - button.offsetWidth);

    const y = Math.random() * (window.innerHeight - button.offsetHeight);

    button.style.left = x + "px";
    button.style.top = y + "px";

    button.style.transform = "none";

});