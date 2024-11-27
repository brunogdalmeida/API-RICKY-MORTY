const modalDetails = document.getElementById("modal-details");
const characterModal = document.getElementById("characterModal");

async function openCharacterModal(id) {
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/${id}`
    );
    const character = response.data;
    const statusColor = character.status === 'Alive' ? 'green' : character.status === 'Dead' ? 'red' : 'yellow';

    const episodeColor = "#00ff00";
    const compactEpisodeList = character.episode
      .slice(0, 5)
      .map((episodeUrl) => {
        const episodeId = episodeUrl.split("/").pop();
        return `<a href="${episodeUrl}" target="_blank" style="color: ${episodeColor}; text-decoration: none;">Episódio ${episodeId}</a>`;
      })
      .join(", ");

    const fullEpisodeList = character.episode
      .map((episodeUrl) => {
        const episodeId = episodeUrl.split("/").pop();
        return `<a href="${episodeUrl}" target="_blank" style="color: ${episodeColor}; text-decoration: none;">Episódio ${episodeId}</a>`;
      })
      .join(", ");

    const moreEpisodesButton =
      character.episode.length > 5
        ? `<span id="toggle-episodes" style="color: ${episodeColor}; cursor: pointer; font-weight: bold;">... Mais Episódios</span>`
        : "";

    modalDetails.innerHTML = `
      <img src="${character.image}" alt="${
      character.name
    }" class="img-fluid rounded-circle mb-3">
      <h2 class="text-success fw-bold">${character.name}</h2>
      <ul class="list-group list-group-flush text-start">
          <li class="list-group-item bg-secondary text-light"><span class="status-circle" style="background-color: ${statusColor};"></span><strong></strong> ${character.status}</li> 
          <li class="list-group-item bg-secondary text-light"><strong>Specie:</strong> ${character.species}</li>
          <li class="list-group-item bg-secondary text-light"><strong>Gender:</strong> ${character.Gender}</li>
          <li class="list-group-item bg-secondary text-light"><strong>Type:</strong> ${character.Type}</li>
          <li class="list-group-item bg-secondary text-light"><strong>Origin:</strong> ${character.origin.name || "Desconhecida"
          }</li>
          <li class="list-group-item bg-secondary text-light"><strong>Location:</strong> ${
            character.location.name || "Desconhecida"
          }</li>
          <li class="list-group-item bg-secondary text-light">
              <strong>Episodes:</strong> 
              <span id="episode-list">${compactEpisodeList}</span>
              ${moreEpisodesButton}
          </li>
      </ul>
    `;

    if (moreEpisodesButton) {
      const toggleEpisodes = document.getElementById("toggle-episodes");
      toggleEpisodes.addEventListener("click", () => {
        const episodeList = document.getElementById("episode-list");
        if (toggleEpisodes.textContent === "... Mais Episódios") {
          episodeList.innerHTML = fullEpisodeList;
          toggleEpisodes.textContent = "Voltar";
        } else {
          episodeList.innerHTML = compactEpisodeList;
          toggleEpisodes.textContent = "... Mais Episódios";
        }
      });
    }

    const modal = new bootstrap.Modal(characterModal);
    modal.show();
  } catch (error) {
    console.error("Erro ao abrir modal:", error);

    modalDetails.innerHTML = `
      <div class="alert alert-danger" role="alert">
          Ocorreu um erro ao carregar os detalhes do personagem.
      </div>
    `;
  }
}