

function fetchRepositories(username, page, perPage) {
    showLoader();
    const reposUrl = `https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`;
  
    fetch(reposUrl)
      .then(response => response.json())
      .then(repos => {
        hideLoader();
        allRepositories = repos;
        displayRepositories(allRepositories);
      })
      .catch(error => {
        hideLoader();
        console.error('Error fetching repositories:', error);
      });
  }
  
  function displayRepositories(repositories) {
    const repoCardsDiv = document.getElementById('repo-cards');
    repoCardsDiv.innerHTML = '';
  
    repositories.forEach(repo => {
      const card = document.createElement('div');
      card.className = 'col-md-4 mb-4';
  
      card.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${repo.name}</h5>
            <p class="card-text">${repo.description || 'No description available.'}</p>
            <a href="${repo.html_url}" class="btn btn-dark" target="_blank">Go to Repository</a>
          </div>
        </div>
      `;
  
      repoCardsDiv.appendChild(card);
    });
  

    const paginationDiv = document.getElementById('pagination');
    paginationDiv.innerHTML = `
      <nav aria-label="Page navigation">
        <ul class="pagination justify-content-center">
          <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage - 1})" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item disabled"><span class="page-link">${currentPage}</span></li>
          <li class="page-item">
            <a class="page-link" href="#" onclick="changePage(${currentPage + 1})" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    `;
  }
  
  function changePage(newPage) {
    if (newPage < 1) {
      return;
    }
  
    currentPage = newPage;
    const username = document.getElementById('username').value;
    fetchRepositories(username, currentPage, perPage);
  }
  
  function updatePerPage() {
    perPage = document.getElementById('repos-per-page').value;
    const username = document.getElementById('username').value;
    fetchRepositories(username, currentPage, perPage);
  }
  
  function searchRepositories() {
    const searchTerm = document.getElementById('repo-search').value.toLowerCase();
    const filteredRepositories = searchTerm
      ? allRepositories.filter(repo => repo.name.toLowerCase().includes(searchTerm))
      : allRepositories;
  
    displayRepositories(filteredRepositories);
  }
  