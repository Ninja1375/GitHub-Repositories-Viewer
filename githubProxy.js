const express = require("express");
const fetch = require("node-fetch");

const app = express();

// Porta padrão ou fornecida pelo Railway
const PORT = process.env.PORT || 3000;

// Rota para buscar repositórios de um usuário
app.get("/repos", async (req, res) => {
    const { username } = req.query;

    if (!username) {
        return res.status(400).json({ error: "O nome de usuário é obrigatório." });
    }

    const url = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${process.env.TOKEN_GITHUB}`, // Token do GitHub como variável de ambiente
            },
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: `Erro: ${response.statusText}` });
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar os repositórios." });
    }
});

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
