<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GitHub Repositories Viewer</title>
  <link rel="stylesheet" href="style.css">
  <link rel="icon" href="https://github.githubassets.com/favicons/favicon.svg" type="image/svg+xml">
</head>
<body>
  <header class="header">
    <h1>GitHub Repositories Viewer</h1>
  </header>

  <main class="container">
    <div class="search-box">
      <input type="text" id="username" placeholder="Enter GitHub username">
      <button id="searchBtn">Search</button>
    </div>

    <div class="sponsor-box">
      <a href="https://github.com/sponsors/Ninja1375" target="_blank" class="sponsor-button">
        Sponsor on GitHub
      </a>
    </div>

    <div id="repoList" class="repo-list"></div>
  </main>

  <footer class="footer">
  Made with ♡ by <a href="https://ninja1375.github.io/Meu-Portfolio/" target="_blank">Antônio Nascimento</a>
  </footer>

  <script src="script.js"></script>
</body>
</html>
