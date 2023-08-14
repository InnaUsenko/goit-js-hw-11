import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { listItems } from './photo-api.js';

const loadMoreBtn = document.querySelector('.load-more');
const searchForm = document.querySelector('#search-form');
const galleryDiv = document.querySelector('.gallery');
const options = {
  captions: true,
  captionsDelay: 250,
  captionSelector: 'img',
  captionType: 'attr',
  captionPosition: 'bottom',
  captionsData: 'alt',
};

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const {
    elements: { searchQuery },
  } = event.currentTarget;
  if (searchQuery.value.length < 1) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  galleryDiv.innerHTML = drowPictures(listItems);

  const lightbox = new SimpleLightbox('.photo-card a', options);
});
loadMoreBtn.addEventListener('click', event => {
  galleryDiv.innerHTML = drowPictures(listItems);

  const lightbox = new SimpleLightbox('.photo-card a', options);
});

function drowPictures(dataList) {
  console.log(dataList.length);
  return dataList
    .map(pict => {
      return `<div class="photo-card">
      <div class="pict">
        <a href=${pict.original} class='gallery__link'>
        <img src="${pict.preview}" alt="${pict.description}" loading="lazy" class="gallery__img"/>
        </a>
      </div>
   
    <div class="info">
      <div class="item">
        <p class="info-item">
            <b>Likes</b>
          </p>
          <p class="data-item">99</p>
      </div>
      <div class="item">
          <p class="info-item">
            <b>Views</b>
          </p>
          <p class="data-item">99</p>
        </div>
        <div class="item">
          <p class="info-item">
            <b>Comments</b>
          </p>
          <p class="data-item">99</p>
        </div>
        <div class="item">
          <p class="info-item">
            <b>Downloads</b>
          </p>
          <p class="data-item">0</p>
        </div>
    </div>
</div>`;
    })
    .join('');
}
