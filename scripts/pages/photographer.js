async function getPhotographers() {
  const url = "/data/photographers.json";
  const response = await fetch(url);
  const data = await response.json();
  return { photographers: data.photographers, medias: data.media };
}

async function getSelectedPhotographer(id) {
  const { photographers, medias } = await getPhotographers();
  const selectedPhotographer = photographers.find(
    (photographer) => photographer.id === id
  );
  const photographerMedias = medias.filter(
    (media) => media.photographerId === id
  );
  return [selectedPhotographer, photographerMedias];
}

// display Photographer Header
function displayPhotographer(photographer) {
  const photographerModel = photographerFactory(photographer);
  const photographerHeader = document.querySelector(".photograph-header");
  const main = document.getElementById("main");
  const contactButton = document.getElementById("contact");
  const headerDiv = document.createElement("div");
  const portrait = document.createElement("img");
  const insert = document.createElement("div");

  headerDiv.innerHTML = `<h1>${photographerModel.name}</h1>
    <h2>${photographerModel.city}, ${photographerModel.country}</h2>
    <p>${photographerModel.tagline}</p>`;
  photographerHeader.appendChild(headerDiv);
  photographerHeader.insertBefore(headerDiv, contactButton);

  portrait.setAttribute(
    "src",
    `assets/photographers/${photographerModel.portrait}`
  );
  portrait.classList.add("portrait");

  insert.innerHTML = `<p>likes 🖤</p>
                      <p>${photographerModel.price}€ / jour</p>`;
  insert.classList.add("photograph-insert");

  photographerHeader.appendChild(portrait);
  main.appendChild(insert);
}

//display Photographer Medias
function displayMedia(medias) {
  const mediaSection = document.querySelector(".photograph-media");
  medias.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(mediaCardDOM);
  });
}

async function selectedInit() {
  const params = new URL(document.location).searchParams;
  const photographerId = parseInt(params.get("id"));
  const [selectedPhotographer, photographerMedias] =
    await getSelectedPhotographer(photographerId);
  displayPhotographer(selectedPhotographer);
  displayMedia(photographerMedias);
  globalLightboxListeners();
}

// TEST******************************

//  FIN TESTS***************************
selectedInit();
