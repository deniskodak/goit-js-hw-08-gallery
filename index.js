import images from './gallery-items.js';

const ulRef = document.querySelector('.js-gallery');
const divModalRef = document.querySelector('.js-lightbox');
const btnRef = document.querySelector('.lightbox__button');
const imgRef = document.querySelector('.lightbox__image');

// Создание галлереи картинок
function createGalleryItems(elements) {
    
    const liList = elements.map(element => {
        
        const { preview, original, description } = element;
        
        const liRef = document.createElement('li');
        liRef.classList.add('gallery__item');

        const aRef = document.createElement('a');
        aRef.classList.add('gallery__link');
        aRef.setAttribute('href', original);

        const imgSmallRef = document.createElement('img');
        imgSmallRef.classList.add('gallery__image');
        imgSmallRef.setAttribute('src', preview);
        imgSmallRef.setAttribute('data-source', original);
        imgSmallRef.setAttribute('alt', description);

        aRef.appendChild(imgSmallRef);
        liRef.appendChild(aRef);

        return liRef;
    });
    
    return liList;
}
ulRef.append(...createGalleryItems(images));

// Открытие модалки
ulRef.addEventListener('click', openModalWindow);
function openModalWindow(e) {
    e.preventDefault();
    console.dir(e.target);
    if (e.target.nodeName === 'IMG') {
        divModalRef.classList.add('is-open');
        imgRef.src = e.target.dataset.source;
        imgRef.alt = e.target.alt;  
    }
    
}

// Закрытие модалки кликом по бэкдропу и кнопке
divModalRef.addEventListener('click', closeModalWindow);
function closeModalWindow(e) {
    divModalRef.classList.remove('is-open');

    imgRef.src = ' ';
    imgRef.alt = ' ';
}

// Закрытие модалки клавишей Escape и слайдер
window.addEventListener('keydown', closeModalWindowByEsc);
function closeModalWindowByEsc(e) {
    if (e.code === 'Escape') {
        closeModalWindow();
    }

    if (e.code === 'ArrowLeft') {
        if (divModalRef.classList.contains('is-open')) {
            ArrowLeft(images);
        }
    }

    if (e.code === 'ArrowRight') {
        if (divModalRef.classList.contains('is-open')) {
            ArrowRight(images);
        }
    }
}
    
function ArrowLeft(array, symbol) {
        for (let i = 0; i < array.length; i += 1) {
            if (array[i].original === imgRef.src && i !== 0) {
                imgRef.src = array[i - 1].original;
                imgRef.alt = array[i - 1].description;
                return imgRef;
            }
        }
}
function ArrowRight(array) {
        for (let i = 0; i < array.length; i += 1) {
            if (array[i].original === imgRef.src && i !== array.length - 1) {
                imgRef.src = array[i + 1].original;
                imgRef.alt = array[i + 1].description;
                return imgRef;
            }
        }
}