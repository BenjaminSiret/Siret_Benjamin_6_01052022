function displayLightbox() {
  const main = document.getElementById("main");
  const images = Array.from(document.querySelectorAll(".sample-image"));
  images.forEach((image) =>
    image.addEventListener("click", (e) => {
      e.preventDefault();
      const imageURL = image.getAttribute("src");
      let lightbox = document.createElement("div");
      lightbox.innerHTML = `<div id="lightbox">
        <button class="lightbox-cross">
          <img src="assets/icons/close-lightbox.svg" alt="Close dialog" />
          </button>
          <button class="lightbox-next">
          <img src="assets/icons/arrow.svg" alt="" />
          </button>
          <button class="lightbox-prev">
          <img src="assets/icons/arrow.svg" alt="" />
          </button>
          <div class="image-container">
          <img
          src="${imageURL}"
          alt=""
          class="image-lightbox"
          />
        </div>
        </div>`;
      main.appendChild(lightbox);
    })
  );
}

//******Copie du html de la lightbox******/

//  <div id="lightbox">
//   <button class="lightbox-cross">
//     <img src="assets/icons/close-lightbox.svg" alt="Close dialog" />
//     </button>
//     <button class="lightbox-next">
//     <img src="assets/icons/arrow.svg" alt="" />
//     </button>
//     <button class="lightbox-prev">
//     <img src="assets/icons/arrow.svg" alt="" />
//     </button>
//     <div class="image-container">
//     <img
//     src="/assets/images/Animals_Rainbow.jpg"
//     alt=""
//     class="image-lightbox"
//     />
//   </div>
//   </div> *}
