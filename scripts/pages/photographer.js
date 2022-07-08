// ******GET FUNCTIONS*******
async function getPhotographers() {
  const url = "../data/photographers.json";
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

  const likesArray = photographerMedias.map((media) => media.likes);
  const sumOfLikes = likesArray.reduce((a, b) => a + b, 0);

  return [selectedPhotographer, photographerMedias, sumOfLikes];
}

// ******DISPLAY FUNCTIONS ***********

// display Photographer Header
function displayPhotographer(photographer, likes) {
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

  insert.innerHTML = `<p id="total-likes">${likes} 🖤</p>
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

// *********LIKE FUNCTION***********
function addLike() {
  let totalOfLikes = parseInt(document.getElementById("total-likes").innerText);

  const likesArray = Array.from(document.querySelectorAll(".likes-heart"));
  likesArray.forEach((element) => {
    let liked = false;
    element.addEventListener("click", (e) => {
      e.preventDefault();
      if (!liked) {
        element.previousElementSibling.innerText =
          parseInt(element.previousElementSibling.innerText) + 1;
        totalOfLikes += 1;
        document.getElementById("total-likes").innerText = `${totalOfLikes} 🖤`;
        liked = true;
      } else {
        element.previousElementSibling.innerText =
          parseInt(element.previousElementSibling.innerText) - 1;
        totalOfLikes -= 1;
        document.getElementById("total-likes").innerText = `${totalOfLikes} 🖤`;
        liked = false;
      }
    });

    element.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        if (!liked) {
          element.previousElementSibling.innerText =
            parseInt(element.previousElementSibling.innerText) + 1;
          totalOfLikes += 1;
          document.getElementById(
            "total-likes"
          ).innerText = `${totalOfLikes} 🖤`;
          liked = true;
        } else {
          element.previousElementSibling.innerText =
            parseInt(element.previousElementSibling.innerText) - 1;
          totalOfLikes -= 1;
          document.getElementById(
            "total-likes"
          ).innerText = `${totalOfLikes} 🖤`;
          liked = false;
        }
      }
    });
  });
}

//*********SORT MEDIAS FUNCTIONS********

function sortMedias(medias) {
  const popularityOption = document.getElementById("popularitySort");
  const dateOption = document.getElementById("dateSort");
  const titleOption = document.getElementById("titleSort");

  // event listeners on select options with mouse
  popularityOption.addEventListener("click", (e) => {
    e.preventDefault();
    medias = medias.sort(popularitySort);
    document.querySelector(".photograph-media").innerHTML = "";
    displayMedia(medias);
    globalLightboxListeners();
  });

  dateOption.addEventListener("click", (e) => {
    e.preventDefault();
    medias = medias.sort(dateSort);
    document.querySelector(".photograph-media").innerHTML = "";
    displayMedia(medias);
    globalLightboxListeners();
  });

  titleOption.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(typeof titleSort);
    medias = medias.sort(titleSort);
    document.querySelector(".photograph-media").innerHTML = "";
    displayMedia(medias);
    globalLightboxListeners();
  });

  // event listeners on select options with keyboard
  const select = document.getElementById("sort-select");
  select.addEventListener("keydown", (e) => {
    let sortType = select.options[select.selectedIndex].id;

    if (e.key === "Enter") {
      switch (sortType) {
        case "popularitySort":
          medias = medias.sort(popularitySort);
          break;
        case "titleSort":
          medias = medias.sort(titleSort);
          break;
        case "dateSort":
          medias = medias.sort(dateSort);
          break;

        default:
          break;
      }
      document.querySelector(".photograph-media").innerHTML = "";
      displayMedia(medias);
      globalLightboxListeners();
    }
  });
}

// sort(compare) functions
function popularitySort(a, b) {
  if (a.likes > b.likes) {
    return -1;
  }
  if (a.likes < b.likes) {
    return 1;
  }
  return 0;
}

function dateSort(a, b) {
  if (a.date < b.date) {
    return -1;
  }
  if (a.date > b.date) {
    return 1;
  }
  return 0;
}

function titleSort(a, b) {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
}

//******INIT*******
async function selectedInit() {
  const params = new URL(document.location).searchParams;
  const photographerId = parseInt(params.get("id"));
  const [selectedPhotographer, photographerMedias, sumOfLikes] =
    await getSelectedPhotographer(photographerId);
  displayPhotographer(selectedPhotographer, sumOfLikes);
  displayMedia(photographerMedias);
  addLike();
  sortMedias(photographerMedias);
  globalLightboxListeners();
}

selectedInit();
