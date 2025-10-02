const images = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

// 1. Знаходимо у DOM контейнер галереї <ul class="gallery">
const listEl = document.querySelector(".gallery");

// 2. Створюємо розмітку для всіх елементів галереї
const markup = images
  .map(
    ({ preview, original, description }) =>
      `<li class="gallery-item">
  <a class="gallery-link" href="${original}">
    <img
      class="gallery-image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
  )
  .join("");

// 3. Додаємо згенеровану розмітку всередину списку .gallery
listEl.insertAdjacentHTML("beforeend", markup);

// 4. Додаємо слухача подій на список .gallery
listEl.addEventListener("click", (event) => {
  event.preventDefault();

  const targetEl = event.target;
  if (targetEl.nodeName !== "IMG") {
    return;
  }

  //5. отримання url великого зображення

  const imageSrc = targetEl.dataset.source;

  //6. картинка модального вікна
  const instance = basicLightbox.create(
    `<div class="modal">
      <img
        class="modal-image"
        src="${imageSrc}"
        alt="alt="${targetEl.alt}"
        loading="lazy"
      />
    </div>`
  );

  //7. відчинення модального вікна
  instance.show();

  //8. зачинення модального вікна
  const modalImgRef = instance.element().querySelector(".modal-image");
  modalImgRef.addEventListener("click", () => instance.close(), { once: true });

  //9. зачинення клавішею клавіатури
  const keydownHandler = (event) => {
    if (event.key !== "Escape") {
      return;
    }
    instance.close();

    //10. зняття слухача з клавіши клавіатури

    window.removeEventListener("keydown", keydownHandler);
  };
  window.addEventListener("keydown", keydownHandler);
});
