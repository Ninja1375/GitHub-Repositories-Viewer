require('dotenv').config();

const GITHUB_TOKEN = process.env.TOKEN_GITHUB;

document.getElementById("searchBtn").addEventListener("click", async () => {
  const username = document.getElementById("username").value.trim();
  const repoList = document.getElementById("repoList");

  // Limpa a lista de repositórios
  repoList.innerHTML = "";

  if (!username) {
    repoList.innerHTML = `<p class="error">Por favor, insira um nome de usuário do GitHub.</p>`;
    return;
  }

  try {
    // Faz a requisição à API do GitHub com autenticação (opcional)
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=created&direction=desc`, {
      headers: GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("Limite de requisições excedido. Tente novamente mais tarde.");
      } else if (response.status === 404) {
        throw new Error("Usuário não encontrado.");
      } else {
        throw new Error("Ocorreu um erro ao buscar os dados.");
      }
    }

    const repositories = await response.json();

    if (repositories.length === 0) {
      repoList.innerHTML = `<p class="error">Este usuário não possui repositórios públicos.</p>`;
      return;
    }

    // Exibe os repositórios
    repositories.forEach(repo => {
      const repoElement = document.createElement("div");
      repoElement.classList.add("repo");

      // Monta o conteúdo do repositório
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
    // Trata erros e exibe uma mensagem para o usuário
    repoList.innerHTML = `<p class="error">${error.message}</p>`;
  }
});
