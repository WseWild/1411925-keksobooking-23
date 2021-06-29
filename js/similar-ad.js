import {createSimilarAd} from '/data.js';

const similarAdTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarAd = createSimilarAd();

const similarFragment = document.createDocumentFragment();

const mapCanvas = document.querySelector('#map-canvas');

similarAd.forEach((card) => {
  const cardElement = similarAdTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.ptice;
  similarFragment.appendChild(cardElement);
});

mapCanvas.appendChild(similarFragment);

