# Conecta Solidária

Projeto acadêmico de Desenvolvimento Front-End para Web (ADS, Cruzeiro do Sul). ONG fictícia de inclusão digital. Desenvolvido com apoio de assistência de programação.

## Tecnologias e funcionalidades
HTML5 semântico, CSS Grid de 12 colunas, Flexbox, cinco breakpoints, JavaScript modular, navegação SPA por hash, templates, máscaras e validação de cadastro, localStorage, Day.js, menu responsivo, dialog, toast e perfil opcional de alto contraste.

## Execução local
Requer Node.js 22 e npm. Na raiz: `npm ci`, `npm test`, `npm run build`. Para desenvolvimento: `npm start` e http://127.0.0.1:8001/html/index.html. Para a build: `npm run preview` e http://127.0.0.1:8002/.

## Estrutura
- html/: documento da SPA.
- css/: estilos e alto contraste.
- js/: navegação, eventos, templates, validação, armazenamento e contraste.
- js/vendor/: Day.js e licença MIT.
- imagens/: WebP/JPEG 480 e 960 px, SVG originais.
- scripts/: build e prévia.
- testes/: testes de validação.
- .github/workflows/: CI e deploy para GitHub Pages.

## Build e publicação
`npm run build` gera dist com esbuild e html-minifier-terser. A entrada da build preserva o hash. O workflow executa npm ci, testes e build em PRs para main/develop; atualizações na main permitem publicar dist após sucesso. Settings > Pages deve usar GitHub Actions. A primeira publicação está em preparação.

## Validação e desempenho
A SPA passou 18 cenários locais de navegação, formulários, persistência e responsividade. Alto contraste e escolha responsiva de imagens foram testados no Chrome. Textos principais: 12,62:1 no modo claro e 21:1 no alto contraste. Isso não é certificação completa WCAG, nem teste com NVDA/VoiceOver. Dois JPEG960 somam 37.030 bytes; WebP960 somam 11.082 e WebP480 somam 5.294. A build após srcset/sizes reduziu o conjunto JS/CSS/HTML de 58.687 para 44.989 bytes (23,34%), sem gzip/imagens.

## Dados e limitações
Use somente dados fictícios. O cadastro é salvo neste navegador, sem back-end e sem envio de dados. CPF é validado por formato, sem conferir dígitos verificadores. Não são realizados pagamentos. Contatos da ONG são fictícios. Falhas de armazenamento são tratadas.

## Versionamento e manutenção
Mensagens seguem Conventional Commits. O histórico inicia pela importação do projeto consolidado; não pretende reconstruir commits anteriores. Organização GitFlow e release serão configuradas durante a publicação. Edite fontes, execute testes e build e revise o PR antes de integrar mudanças. Não versione node_modules nem dist.
