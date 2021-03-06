let page = document.getElementById("buttonDiv");
let selectedClassName = "current";
const presetButtonColors = ["#000000", "#eb4034", "#3443eb", "#dfeb34", "#34eb3d", "#FFFFFF"];
function handleButtonClick(event) {
  let current = event.target.parentElement.querySelector(
    `.${selectedClassName}`
  );
  if (current && current !== event.target) {
    current.classList.remove(selectedClassName);
  }
  let color = event.target.dataset.color;
  event.target.classList.add(selectedClassName);
  chrome.storage.sync.set({ color });
}
function constructOptions(buttonColors) {
  chrome.storage.sync.get("color", (data) => {
    let currentColor = data.color;
    for (let buttonColor of buttonColors) {
      let button = document.createElement("button");
      button.dataset.color = buttonColor;
      button.style.backgroundColor = buttonColor;
      if (buttonColor === currentColor) {
        button.classList.add(selectedClassName);
      }
      button.addEventListener("click", handleButtonClick);
      page.appendChild(button);
    }
  });
}
constructOptions(presetButtonColors);