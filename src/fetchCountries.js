import Notiflix from 'notiflix';

const BASE_URL = 'https://restcountries.com/v3.1/';
const ENDPOINT = 'name/';

function fetchCountries(name) {
  const URL = `${BASE_URL}${ENDPOINT}${name}`;
  return fetch(URL).then(resp => {
    if (!resp.ok) {
      throw new Error(
        Notiflix.Notify.failure('Oops, there is no country with that name')
      );
    }
    return resp.json();
  });
}

export { fetchCountries };
