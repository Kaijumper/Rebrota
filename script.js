const scrollContainer = document.querySelector(".scroll-container");
const treeContainer = document.getElementById("treeContainer");
const animalContainers = document.querySelectorAll(".animal-container");
const introText = document.getElementById("introText");
const missionText = document.getElementById("missionText");

let lastScroll = 0;

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// Forcer le scroll en haut dès que la page est chargée
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

function updateScene() {
  const scrollTop = window.pageYOffset;
  const windowHeight = window.innerHeight;
  const scrollHeight = scrollContainer.offsetHeight;
  const maxScroll = scrollHeight - windowHeight;
  const scrollProgress = Math.min(scrollTop / maxScroll, 1);

  // Zoom progressif sur l'arbre - zoom beaucoup plus fort pour remplir l'écran avec le feuillage
  const maxScale = 8;
  const scale = 1 + Math.min(scrollProgress, 0.5) * 2 * (maxScale - 1);
  treeContainer.style.transform = `scale(${scale})`;

  // Afficher le texte d'introduction
  if (scrollProgress < 0.15) {
    introText.classList.add("visible");
  } else {
    introText.classList.remove("visible");
  }

  // Afficher le texte de mission
  if (scrollProgress > 0.15 && scrollProgress < 0.35) {
    missionText.classList.add("visible");
  } else {
    missionText.classList.remove("visible");
  }

  // Révéler les animaux un par un - un seul visible à la fois
  animalContainers.forEach((container, index) => {
    const startThreshold = 0.4 + index * 0.2;
    const endThreshold = startThreshold + 0.15;

    if (scrollProgress >= startThreshold && scrollProgress < endThreshold) {
      container.classList.add("visible");
    } else {
      container.classList.remove("visible");
    }
  });

  lastScroll = scrollTop;
}

window.addEventListener("scroll", updateScene);
updateScene();
