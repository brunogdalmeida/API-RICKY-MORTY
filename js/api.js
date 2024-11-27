const baseURL = "https://rickandmortyapi.com/api/character";

async function fetchCharacters(page = 1, query = "") {
  try {
    const response = await axios.get(baseURL, {
      params: { page, name: query },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar personagens:", error);
    return null;
  }
}