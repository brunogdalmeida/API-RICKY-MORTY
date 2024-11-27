const resultsContainer = document.getElementById("results");
const paginationContainer = document.querySelector(".pagination");

let allCharacters = [];
let currentPage = 1;
const cardsPerPage = 6;

async function loadAllCharacters() {
  try {
    let page = 1;
    let data;
    allCharacters = [];

    do {
      const response = await fetchCharacters(page);
      if (response) {
        data = response;
        allCharacters = allCharacters.concat(data.results);
        page++;
      } else {
        data = null;
      }
    } while (data && data.info.next);

    totalPages = Math.ceil(allCharacters.length / cardsPerPage);
    displayResults();
    createPagination(totalPages);
  } catch (error) {
    console.error("Erro ao carregar todos os personagens:", error);
    resultsContainer.innerHTML = `<p class="text-center">Erro ao carregar personagens.</p>`;
  }
}

async function displayResults() {
  resultsContainer.innerHTML = "";

  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = Math.min(startIndex + cardsPerPage, allCharacters.length);

  for (let i = startIndex; i < endIndex; i++) {
    const character = allCharacters[i];
    const lastEpisodeUrl = character.episode[character.episode.length - 1];
    const location = character.location.url
      ? character.location
      : { name: "Desconhecido", url: "#" };

    let translatedStatus;
    let statusColor;

    switch (character.status) {
      case "Alive":
        statusColor = "green";
        break;
      case "Dead":
        statusColor = "red";
        break;
      default:
        statusColor = "gray";
        break;
    }

    let lastEpisodeName = "Desconhecido";
    if (lastEpisodeUrl) {
      try {
        const episodeResponse = await axios.get(lastEpisodeUrl);
        lastEpisodeName = episodeResponse.data.name || "Desconhecido";
      } catch (error) {
        console.error("Erro ao buscar o episódio:", error);
      }
    }

    const characterCard = `
      <div class="col-md-6 col-lg-4 d-flex justify-content-center">
        <div class="card bg-dark text-light border-success" style="width: 18rem;">
          <img src="${character.image}" class="card-img-top" alt="${character.name}">
          <div class="card-body">
            <h5 class="card-title">${character.name}</h5>
            <p>
              <span class="status-circle" style="background-color: ${statusColor}; width: 10px; height: 10px; border-radius: 50%; display: inline-block; margin-right: 5px;"></span>
              <strong>${character.status}</strong> - ${character.species}
            </p>
            <p color: #d3d3d3;">Last known location </br><a href="${location.url}" target="_blank" class="episode-link">${location.name}</a></p>
            <p color: #d3d3d3;">Last time seen</br><a href="${lastEpisodeUrl}" target="_blank" class="episode-link">${lastEpisodeName}</a></p>
            <button class="btn btn-success" onclick="openCharacterModal(${character.id})">Mais informações</button>
          </div>
        </div>
      </div>
    `;
    resultsContainer.innerHTML += characterCard;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadAllCharacters();
});