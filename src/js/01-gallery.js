// Add imports above this line
import SimpleLightbox from "simplelightbox";
import { galleryItems } from './gallery-items';
import "simplelightbox/dist/simple-lightbox.min.css";
// Change code below this line

const oneGallery = createGallary(galleryItems);

function createGallary(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <div class="gallery__item">
            <a class="gallery__item" href="${original}">
                <img class="gallery__image" src="${preview}" alt="${description}" />
            </a>
        </div>`;
    })
    .join("");
}

const addItemsToGallery = document.querySelector(".gallery");
addItemsToGallery.insertAdjacentHTML("beforeend", oneGallery);

new SimpleLightbox(".gallery a.gallery__item", {
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: '250'
  });

console.log(galleryItems);
