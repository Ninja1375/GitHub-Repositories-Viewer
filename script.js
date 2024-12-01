document.getElementById('searchBtn').addEventListener('click', async () => {
  const username = document.getElementById('username').value.trim();
  const repoList = document.getElementById('repoList');
  
  // Limpar resultados anteriores
  repoList.innerHTML = '';

  if (!username) {
    repoList.innerHTML = '<p class="error">Please enter a GitHub username.</p>';
    return;
  }

  try {
    let page = 1;
    const allRepos = [];

    // Busca paginada
    while (true) {
      const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&page=${page}&sort=created`);
      if (!response.ok) throw new Error(`User not found (status: ${response.status})`);

      const repos = await response.json();
      if (repos.length === 0) break;

      allRepos.push(...repos);
      page++;
    }

    // Ordenar repositórios do mais recente para o mais antigo
    allRepos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    if (allRepos.length === 0) {
      repoList.innerHTML = '<p class="error">No repositories found for this user.</p>';
      return;
    }

    // Renderizar os repositórios
    allRepos.forEach(repo => {
      const repoDiv = document.createElement('div');
      repoDiv.className = 'repo';

      repoDiv.innerHTML = `
        <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
        <p>${repo.description || "Sem descrição disponível."}</p>
        <p><strong>🌟 Estrelas:</strong> ${repo.stargazers_count}</p>
        <p><strong>🍴 Forks:</strong> ${repo.forks_count}</p>
        <p><strong>📅 Criado em:</strong> ${new Date(repo.created_at).toLocaleDateString()}</p>
        <p><strong>🔄 Última atualização:</strong> ${new Date(repo.updated_at).toLocaleDateString()}</p>
      `;

      repoList.appendChild(repoDiv);
    });
  } catch (error) {
    repoList.innerHTML = `<p class ="error">${error.message}</p>`;
  }
});
