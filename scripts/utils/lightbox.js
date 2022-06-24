function displayLightbox(imageURL, imageAlt) {
  const lightbox = document.getElementById("lightbox");
  const header = document.getElementById("header");
  const main = document.getElementById("main");
  const imgExtension = imageURL.split(".").pop();

  header.setAttribute("aria-hidden", true);
  main.setAttribute("aria-hidden", true);
  lightbox.setAttribute("aria-hidden", false);
  imageContainer = document.querySelector(".image-container");

  // display video or img, depending on image extension
  if (imgExtension === "mp4") {
    imageContainer.innerHTML = `<video id="image" src="${imageURL}" alt="${imageAlt} " class="image-lightbox" controls/>`;
  } else {
    imageContainer.innerHTML = `<img id="image" src="${imageURL}" alt="${imageAlt}" class="image-lightbox" />`;
  }

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
}

function nextImage() {
  const images = Array.from(document.querySelectorAll(".sample-image"));
  const gallery = images.map((image) => image.getAttribute("src"));
  const currentImage = document.getElementById("image");

  let imgIndex = gallery.findIndex(
    (img) => img === currentImage.getAttribute("src")
  );
  if (imgIndex === gallery.length - 1) {
    imgIndex = -1;
  }

  const nextImageAlt = images[imgIndex + 1]
    .getAttribute("alt")
    .split(",")
    .slice(0, 1);

  displayLightbox(gallery[imgIndex + 1], nextImageAlt);
}

function prevImage() {
  const images = Array.from(document.querySelectorAll(".sample-image"));
  const gallery = images.map((image) => image.getAttribute("src"));
  const currentImage = document.getElementById("image");

  let imgIndex = gallery.findIndex(
    (img) => img === currentImage.getAttribute("src")
  );

  if (imgIndex === 0) {
    const prevImageAlt = images[images.length - 1]
      .getAttribute("alt")
      .split(",")
      .slice(0, 1);
    displayLightbox(gallery[gallery.length - 1], prevImageAlt);
  } else {
    const prevImageAlt = images[imgIndex - 1]
      .getAttribute("alt")
      .split(",")
      .slice(0, 1);
    displayLightbox(gallery[imgIndex - 1], prevImageAlt);
  }
}

function globalLightboxListeners() {
  // display lightbox on click
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

//*********VARIABLES**********
const nextBtn = document.querySelector(".lightbox-next");
const prevBtn = document.querySelector(".lightbox-prev");

//*********EVENT LISTENERS***********

nextBtn.addEventListener("click", (e) => {
  e.preventDefault();
  nextImage();
});

prevBtn.addEventListener("click", (e) => {
  e.preventDefault();
  prevImage();
});

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
