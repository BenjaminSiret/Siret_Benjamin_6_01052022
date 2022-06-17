function displayLightbox(imageURL, imageAlt) {
  const lightbox = document.getElementById("lightbox");
  const header = document.getElementById("header");
  const main = document.getElementById("main");
  const image = document.getElementById("image");
  header.setAttribute("arria-hidden", true);
  main.setAttribute("arria-hidden", true);
  lightbox.setAttribute("aria-hidden", false);
  image.setAttribute("src", `/${imageURL}`);
  image.setAttribute("alt", `${imageAlt}`);
  header.style.opacity = "0.1";
  main.style.opacity = "0.1";
  lightbox.style.display = "block";
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  const header = document.getElementById("header");
  const main = document.getElementById("main");
  header.setAttribute("aria-hidden", false);
  header.style.opacity = "1";
  main.setAttribute("aria-hidden", false);
  main.style.opacity = "1";
  lightbox.setAttribute("aria-hidden", true);
  lightbox.style.display = "none";
  console.log("toto");
}

function lightboxListeners() {
  const images = Array.from(document.querySelectorAll(".sample-image"));
  images.forEach((image) =>
    image.addEventListener("click", (e) => {
      e.preventDefault();
      const imageURL = image.getAttribute("src");
      const imageAlt = image.getAttribute("alt").split(",").slice(0, 1);
      displayLightbox(imageURL, imageAlt);
    })
  );
}

//************* A SUPPRIMER EN FIN DE PROJET **************

// function displayLightbox() {
//   const main = document.getElementById("main");
//   const images = Array.from(document.querySelectorAll(".sample-image"));
//   images.forEach((image) =>
//     image.addEventListener("click", (e) => {
//       e.preventDefault();
//       const imageURL = image.getAttribute("src");
//       let lightbox = document.createElement("div");
//       lightbox.innerHTML = `<div id="lightbox">
//         <button class="lightbox-cross">
//           <img src="assets/icons/close-lightbox.svg" alt="Close dialog" />
//           </button>
//           <button class="lightbox-next">
//           <img src="assets/icons/arrow.svg" alt="" />
//           </button>
//           <button class="lightbox-prev">
//           <img src="assets/icons/arrow.svg" alt="" />
//           </button>
//           <div class="image-container">
//           <img
//           src="${imageURL}"
//           alt=""
//           class="image-lightbox"
//           />
//         </div>
//         </div>`;
//       main.appendChild(lightbox);
//     })
//   );
// }
