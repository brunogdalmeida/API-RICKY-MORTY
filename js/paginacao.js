function createPagination(totalPages) {
  paginationContainer.innerHTML = "";

  const visiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  let endPage = Math.min(totalPages, startPage + visiblePages - 1);

  if (endPage - startPage + 1 < visiblePages) {
    startPage = Math.max(1, endPage - visiblePages + 1);
  }

  if (currentPage > 1) {
    const lessButton = document.createElement("button");
    lessButton.className = "btn btn-outline-success mx-1";
    lessButton.textContent = "Página Anterior";
    lessButton.addEventListener("click", () => {
      currentPage = Math.max(1, currentPage - 1);
      displayResults();
      createPagination(totalPages);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    paginationContainer.appendChild(lessButton);
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageButton = document.createElement("button");
    pageButton.className = `btn btn-outline-success mx-1 ${
      i === currentPage ? "active" : ""
    }`;
    pageButton.textContent = i;

    pageButton.addEventListener("click", () => {
      currentPage = i;
      displayResults();
      createPagination(totalPages);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    paginationContainer.appendChild(pageButton);
  }

  if (currentPage < totalPages) {
    const moreButton = document.createElement("button");
    moreButton.className = "btn btn-outline-success mx-1";
    moreButton.textContent = "Próxima página";
    moreButton.addEventListener("click", () => {
      currentPage = Math.min(totalPages, currentPage + 1);
      displayResults();
      createPagination(totalPages);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    paginationContainer.appendChild(moreButton);
  }
}