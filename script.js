const GITHUB_TOKEN = process.env.GITHUB_TOKEN || null;

if (!GITHUB_TOKEN) {
  throw new Error("Token não encontrado. Certifique-se de que o segredo foi carregado corretamente.");
}

document.getElementById("searchBtn").addEventListener("click", async () => {
  const username = document.getElementById("username").value.trim();
  const repoList = document.getElementById("repoList");

  repoList.innerHTML = "";

  if (!username) {
    repoList.innerHTML = `<p class="error">Por favor, insira um nome de usuário do GitHub.</p>`;
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=created&direction=desc`, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const repositories = await response.json();

    if (repositories.length === 0) {
      repoList.innerHTML = `<p class="error">Este usuário não possui repositórios públicos.</p>`;
      return;
    }

    repositories.forEach((repo) => {
      const repoElement = document.createElement("div");
      repoElement.classList.add("repo");
      repoElement.innerHTML = `
        <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
        <p>${repo.description || "Sem descrição disponível."}</p>
        <p><strong>🌟 Estrelas:</strong> ${repo.stargazers_count}</p>
        <p><strong>🍴 Forks:</strong> ${repo.forks_count}</p>
        <p><strong>📅 Criado em:</strong> ${new Date(repo.created_at).toLocaleDateString()}</p>
        <p><strong>🔄 Última atualização:</strong> ${new Date(repo.updated_at).toLocaleDateString()}</p>
      `;
      repoList.appendChild(repoElement);
    });
  } catch (error) {
    repoList.innerHTML = `<p class="error">${error.message}</p>`;
  }
});
