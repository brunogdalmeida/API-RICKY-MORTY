const searchButton = document.getElementById("search-btn");
const searchInput = document.getElementById("search");
const messageContainer = document.getElementById("message-container");

async function loadCharactersWithSearch() {
  const query = searchInput.value.trim();
  if (!query) {
    showMessage("Por favor, insira um nome para pesquisar.", "warning");
    return;
  }

  showLoader("Carregando resultados...");

  try {
    const data = await fetchCharacters(1, query);
    hideLoader();

    if (data && data.results.length > 0) {
      allCharacters = data.results;
      totalPages = Math.ceil(allCharacters.length / cardsPerPage);
      currentPage = 1;
      displayResults();
      createPagination(totalPages, query);
    } else {
      showMessage(`Nenhum personagem encontrado para "${query}".`, "warning");
      resultsContainer.innerHTML = `<p class="text-center">Nenhum personagem encontrado para "${query}".</p>`;
      paginationContainer.innerHTML = "";
    }
  } catch (error) {
    hideLoader();
    console.error("Erro ao buscar personagens:", error);
    showMessage("Erro ao buscar personagens. Tente novamente.", "danger");
  }
}

function showLoader(message) {
  messageContainer.innerHTML = `
        <div class="d-flex justify-content-center align-items-center">
            <div class="loader"></div>
            <span class="ms-2">${message}</span>
        </div>
    `;
}

function hideLoader() {
  messageContainer.innerHTML = "";
}

function showMessage(message, type = "info") {
  messageContainer.innerHTML = `
        <div class="alert alert-${type} text-center" role="alert">
            ${message}
        </div>
    `;
  setTimeout(() => {
    messageContainer.innerHTML = "";
  }, 3000);
}

searchButton.addEventListener("click", loadCharactersWithSearch);

searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    loadCharactersWithSearch();
  }
});