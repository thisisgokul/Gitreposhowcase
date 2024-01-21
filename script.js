
const apiUrl = 'https://api.github.com/users/YOUR_GITHUB_USERNAME/repos';
let perPage = 9;
let currentPage = 1;
let allRepositories = [];

function getUserData() {
  showLoader();
  const username = document.getElementById('username').value;
  const userUrl = `https://api.github.com/users/${username}`;
  fetch(userUrl)
    .then(response => response.json())
    .then(data => {
      hideLoader();
      displayUserProfile(data);
      fetchRepositories(username, currentPage, perPage);
    })
    .catch(error => {
      hideLoader();
      console.error('Error fetching user data:', error);
    });
}

function showLoader() {
  document.getElementById('loader').style.display = 'block';
}

function hideLoader() {
  document.getElementById('loader').style.display = 'none';
}
