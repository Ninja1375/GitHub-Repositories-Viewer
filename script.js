document.getElementById("searchButton").addEventListener("click", async () => {
    const username = document.getElementById("username").value;
    if (!username) {
        alert("Por favor, insira um nome de usuário do GitHub.");
        return;
    }

    // Carregar o token de forma segura
    const token = await fetchToken();

    if (!token) {
        alert("Token não encontrado ou inválido.");
        return;
    }

    const url = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Erro ao buscar repositórios: ${response.statusText}`);
        }

        const repos = await response.json();
        displayRepositories(repos);
    } catch (error) {
        console.error(error);
        alert("Erro ao buscar os repositórios. Verifique o nome de usuário ou tente novamente mais tarde.");
    }
});

async function fetchToken() {
    try {
        const response = await fetch("token.js");
        if (response.ok) {
            const script = await response.text();
            eval(script); // Define window.GITHUB_TOKEN dinamicamente
            return window.GITHUB_TOKEN;
        } else {
            console.error("Não foi possível carregar o token.js");
            return null;
        }
    } catch (error) {
        console.error("Erro ao carregar o token:", error);
        return null;
    }
}

function displayRepositories(repos) {
    const repoList = document.getElementById("repoList");
    repoList.innerHTML = ""; // Limpa a lista anterior

    if (repos.length === 0) {
        repoList.innerHTML = "<p>Nenhum repositório encontrado.</p>";
        return;
    }

    repos.forEach(repo => {
        const repoItem = document.createElement("div");
        repoItem.className = "repo-item";
        repoItem.innerHTML = `
            <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
            <p>${repo.description || "Sem descrição"}</p>
            <p><strong>⭐ Stars:</strong> ${repo.stargazers_count}</p>
            <p><strong>🔀 Forks:</strong> ${repo.forks_count}</p>
            <p><strong>📅 Atualizado em:</strong> ${new Date(repo.updated_at).toLocaleDateString()}</p>
        `;
        repoList.appendChild(repoItem);
    });
}
