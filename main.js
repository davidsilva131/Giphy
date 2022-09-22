// Get references DOM
const searchInput = document.getElementById('search');
const btnSearch = document.getElementById('btnSearch');
const container__cards = document.getElementById('container__cards');
const recentSearchsBody = document.getElementById('recentSearchsBody');
const recentSearchItem = document.getElementsByClassName('recentSearchItem');

const API_URL = 'https://api.giphy.com/v1/gifs/search';
const API_KEY = '3S1sEtzYFkG7uVLeLDtqEubs7wQbGSGb';

let searchs = [];
//let searchs = JSON.parse(sessionStorage.getItem('searchs')) || [];
//Event Functions
const handleSearch = async () => {
    let text = searchInput.value;
    searchs.push(text);
    sessionStorage.setItem('searchs', JSON.stringify(searchs));
    let queryUrl = `${API_URL}?api_key=${API_KEY}&q=${text}&limit=10`;
    try {
        let response = await fetch(queryUrl);
        let info = await response.json();
        renderCards(info.data);
    } catch (error) {
        console.log(error);
    }
}
const handleRecentSearch = async (index) => {
    let queryUrl = `${API_URL}?api_key=${API_KEY}&q=${recentSearchItem[index].textContent}&limit=10`;
    try {
        let response = await fetch(queryUrl);
        let info = await response.json();
        renderCards(info.data);
    } catch (error) {
        console.log(error);
    }
}

const renderCards = (data) => {
    container__cards.innerHTML = '';
    data.forEach(element => {
        let urlImage = element.images.original.url;
        container__cards.innerHTML += `
          <article class="card">
          <figure>
              <img src="${urlImage}"
                  alt="" class="card__img">
          </figure>
      </article>`;
    });
    showList();
}

const showList = () => {
    recentSearchsBody.innerHTML = '';
    const sessionInfo = JSON.parse(sessionStorage.getItem('searchs'));
    sessionInfo.forEach(element => {
        recentSearchsBody.innerHTML += `
        <tr>
        <td class="recentSearchItem"> ${element}</td>
        </tr>`
    });
    Array.from(recentSearchItem).forEach((element, index) => {
        element.addEventListener('click', () => { handleRecentSearch(index) });
    })

}

// Event Listeners
btnSearch.addEventListener('click', handleSearch);
showList();
