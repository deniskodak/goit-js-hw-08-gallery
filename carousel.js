import gallery from "./gallery-items.js";

const jsGallery = document.querySelector(".js-gallery");
const divLightbox = document.querySelector(".js-lightbox");
const divOverlay = document.querySelector(".lightbox__overlay");
const imgModal = document.querySelector(".lightbox__image");
const buttonClose = document.querySelector(".lightbox__button");
gallery.map((el, index) => {
  jsGallery.innerHTML += `<li class="gallery__item"><a class="gallery__link" href="${el.preview}"><img class="gallery__image" src="${el.preview}" data-source="${el.original}" alt="${el.description}" data-index="${index}"/></a></li>`;
});
// const galleryItem = document.querySelectorAll(".gallery__item");
jsGallery.addEventListener("click", (e) => {
  e.preventDefault();
  let modalLink = e.target.dataset.source;
  divLightbox.classList.add("is-open");
  imgModal.src = modalLink;
  imgModal.dataset.index = e.target.dataset.index
});


buttonClose.addEventListener("click", closeOverlay);
divOverlay.addEventListener("click", closeOverlay);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeOverlay()
  }
  if (e.key === "ArrowLeft") {
    arrowLeft()
  }
  if (e.key === "ArrowRight") {
    arrowRight()
  }

});

function closeOverlay() {
  divLightbox.classList.remove("is-open");
  imgModal.src = "";
}

function setNewSrc(step, index) {
  imgModal.dataset.index = `${index + step}`
  imgModal.src = gallery[index + step].original
}

function arrowLeft() {
  let index = Number(imgModal.dataset.index)
  if (index === 0) {
    setNewSrc(0, gallery.length - 1)
    return
  }
  console.log(index);
  setNewSrc(-1, index)
}

function arrowRight() {
  let index = +imgModal.dataset.index
  if (index === gallery.length - 1) {
    setNewSrc(0, 0)
    return
  }
  console.log(index);
  setNewSrc(1, index)
}


