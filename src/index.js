import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const container = document.querySelector('.country-info');
const list = document.querySelector('.country-list');

const onTyping = debounce(evt => {
  const name = evt.target.value.trim();
  if (!name) {
    container.innerHTML = '';
    list.innerHTML = '';
    return;
  }
  fetchCountries(name)
    .then(listCountry)
    .catch(err => console.log(err));
}, DEBOUNCE_DELAY);

input.addEventListener('input', onTyping);

function listCountry(data) {
  const numCountries = data.length;
  if (numCountries > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    container.innerHTML = '';
    list.innerHTML = '';
    return;
  }
  if (numCountries === 1) {
    list.innerHTML = '';
    return countryInfo(data);
  }
  if (numCountries > 1) {
    container.innerHTML = '';
    return manyCountries(data);
  }
}

function countryInfo(data) {
  const markup = data
    .map(country => {
      return `<div class="country">
      <img src="${country.flags.svg}" width="50" height="30" alt="flag of ${
        country.name.official
      }">
      <h2 class="country-title">${country.name.official}</h2></div>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${Object.values(country.languages)}</p>`;
    })
    .join('');
  container.innerHTML = markup;
}

function manyCountries(data) {
  const markup = data
    .map(country => {
      return `<li class="country">
      <img src="${country.flags.svg}" width="50" height="30" alt="flag of ${country.name.official}">
      <p>${country.name.official}</p></li>`;
    })
    .join('');
  list.innerHTML = markup;
}
