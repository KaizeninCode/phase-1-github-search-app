const searchForm = document.getElementById('github-form');
const searchInput = document.getElementById('search');
const resultsDiv = document.getElementById('github-container');

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const searchTerm = searchInput.value.trim();
    if (!searchTerm) return;

    try {
        const response = await fetch(`https://api.github.com/search/users?q=${searchTerm}`);
        const data = await response.json();

        displayResults(data.items);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

function displayResults(users) {
    resultsDiv.innerHTML = '';

    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.className = 'users'
        userDiv.innerHTML = `
            <img src="${user.avatar_url}" alt="${user.login}'s avatar" width="50">
            <p>${user.login}</p>
            <a href="${user.html_url}">View Profile</a>
        `;

        userDiv.addEventListener('click', async (e) => {
            e.preventDefault()
            try {
                const response = await fetch(user.repos_url);
                const data = await response.json();

                displayRepos(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        });

        resultsDiv.appendChild(userDiv);
    });
}

function displayRepos(repos) {
    resultsDiv.innerHTML = '';

    repos.forEach(repo => {
        const repoDiv = document.createElement('div');
        repoDiv.className = 'repos'
        repoDiv.innerHTML = `
            <p>${repo.name}</p>
            <p>${repo.description}</p>
            <a href="${repo.html_url}">View Repository</a>
        `;

        resultsDiv.appendChild(repoDiv);
    });
}