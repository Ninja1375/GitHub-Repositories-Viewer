document.getElementById('searchButton').addEventListener('click', async function() {
    const username = document.getElementById('username').value;
    const resultContainer = document.getElementById('repoResults');

    // Limpar resultados anteriores
    resultContainer.innerHTML = '';

    if (!username) {
        alert('Por favor, insira o nome de usuário do GitHub.');
        return;
    }

    try {
        const response = await fetch(`https://seu-app.up.railway.app/repos?username=${username}`);
        
        // Verifica se a resposta é válida
        if (!response.ok) {
            throw new Error(`Erro: ${response.statusText}`);
        }

        const repos = await response.json();

        if (repos.length === 0) {
            resultContainer.innerHTML = '<p>Nenhum repositório encontrado.</p>';
            return;
        }

        repos.forEach(repo => {
            const repoElement = document.createElement('div');
            repoElement.classList.add('repo');

            // Exibe as informações do repositório
            repoElement.innerHTML = `
                <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                <p><strong>Descrição:</strong> ${repo.description || 'Sem descrição'}</p>
                <p><strong>Estrelas:</strong> ${repo.stargazers_count}</p>
                <p><strong>Forks:</strong> ${repo.forks_count}</p>
                <p><strong>Data de Criação:</strong> ${new Date(repo.created_at).toLocaleDateString()}</p>
                <p><strong>Última Atualização:</strong> ${new Date(repo.updated_at).toLocaleDateString()}</p>
            `;

            resultContainer.appendChild(repoElement);
        });

    } catch (error) {
        resultContainer.innerHTML = `<p>Erro: ${error.message}</p>`;
    }
});
