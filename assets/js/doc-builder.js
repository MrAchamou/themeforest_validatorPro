// ThemeForest Validator Pro - DocBuilder Module
// Module de génération de documentation automatique

const cheerio = require("cheerio");

class DocBuilder {
    constructor() {
        // Initialisation
    }

    async generateDocumentation(templateData) {
        const docHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Documentation du Template - ${templateData.name || "Votre Template"}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: 'Inter', sans-serif; }
        .section-title { border-left: 4px solid #8B5CF6; padding-left: 1rem; }
    </style>
</head>
<body class="bg-gray-100 text-gray-900">
    <div class="container mx-auto p-8">
        <header class="text-center mb-12">
            <h1 class="text-5xl font-bold text-purple-700 mb-4">Documentation du Template</h1>
            <p class="text-xl text-gray-600">${templateData.description || "Documentation complète pour votre template ThemeForest."}</p>
        </header>

        <nav class="mb-12 bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-2xl font-semibold mb-4">Table des Matières</h2>
            <ul class="list-disc list-inside space-y-2">
                <li><a href="#introduction" class="text-blue-600 hover:underline">Introduction</a></li>
                <li><a href="#installation" class="text-blue-600 hover:underline">Installation</a></li>
                <li><a href="#structure" class="text-blue-600 hover:underline">Structure des Fichiers</a></li>
                <li><a href="#customization" class="text-blue-600 hover:underline">Personnalisation</a></li>
                <li><a href="#dependencies" class="text-blue-600 hover:underline">Dépendances</a></li>
                <li><a href="#faq" class="text-blue-600 hover:underline">FAQ</a></li>
                <li><a href="#contact" class="text-blue-600 hover:underline">Contact</a></li>
                <li><a href="#changelog" class="text-blue-600 hover:underline">Changelog</a></li>
            </ul>
        </nav>

        <section id="introduction" class="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 class="text-3xl font-bold section-title mb-4">Introduction</h2>
            <p>Bienvenue dans la documentation de votre template. Ce guide vous aidera à comprendre la structure, à installer et à personnaliser votre nouveau template.</p>
            <p>Ce template est conçu pour ${templateData.purpose || "être un point de départ moderne et réactif pour vos projets web."}</p>
        </section>

        <section id="installation" class="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 class="text-3xl font-bold section-title mb-4">Installation</h2>
            <p>Suivez ces étapes pour installer votre template :</p>
            <ol class="list-decimal list-inside ml-4 space-y-2">
                <li>Décompressez le fichier ZIP téléchargé.</li>
                <li>Uploadez le contenu du dossier <code>Template/</code> sur votre serveur web.</li>
                <li>Accédez à <code>index.html</code> via votre navigateur.</li>
            </ol>
        </section>

        <section id="structure" class="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 class="text-3xl font-bold section-title mb-4">Structure des Fichiers</h2>
            <p>Le template est organisé comme suit :</p>
            <pre class="bg-gray-800 text-white p-4 rounded-md mt-4"><code>
. (racine du template)
├── index.html
├── assets/
│   ├── css/
│   │   └── main.css
│   ├── js/
│   │   └── app.js
│   └── img/
├── Documentation/
│   └── index.html (ce fichier)
├── Licenses/
├── README.txt
└── changelog.txt
            </code></pre>
        </section>

        <section id="customization" class="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 class="text-3xl font-bold section-title mb-4">Personnalisation</h2>
            <p>Vous pouvez personnaliser les éléments suivants :</p>
            <ul class="list-disc list-inside ml-4 space-y-2">
                <li><strong>Couleurs :</strong> Modifiez les variables CSS dans <code>assets/css/main.css</code>.</li>
                <li><strong>Typographie :</strong> Les polices sont définies dans <code>index.html</code> et stylisées via Tailwind CSS.</li>
                <li><strong>Menus :</strong> Les liens de navigation se trouvent dans <code>index.html</code>.</li>
            </ul>
        </section>

        <section id="dependencies" class="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 class="text-3xl font-bold section-title mb-4">Dépendances</h2>
            <p>Ce template utilise les bibliothèques suivantes :</p>
            <ul class="list-disc list-inside ml-4 space-y-2">
                <li><a href="https://tailwindcss.com/" target="_blank" class="text-blue-600 hover:underline">Tailwind CSS</a> (Framework CSS)</li>
                <li><a href="https://www.chartjs.org/" target="_blank" class="text-blue-600 hover:underline">Chart.js</a> (pour les graphiques, si utilisé)</li>
                <li><a href="https://stuk.github.io/jszip/" target="_blank" class="text-blue-600 hover:underline">JSZip</a> (pour la manipulation des fichiers ZIP)</li>
            </ul>
        </section>

        <section id="faq" class="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 class="text-3xl font-bold section-title mb-4">FAQ</h2>
            <h3 class="text-2xl font-semibold mt-6 mb-2">Comment changer les images ?</h3>
            <p>Remplacez les fichiers images dans le dossier <code>assets/img/</code> par les vôtres, en conservant les mêmes noms de fichiers ou en mettant à jour les chemins dans <code>index.html</code>.</p>
            <h3 class="text-2xl font-semibold mt-6 mb-2">Le template est-il responsive ?</h3>
            <p>Oui, ce template est entièrement responsive et s'adapte à toutes les tailles d'écran grâce à Tailwind CSS.</p>
        </section>

        <section id="contact" class="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 class="text-3xl font-bold section-title mb-4">Contact</h2>
            <p>Pour toute question ou support, veuillez nous contacter via ${templateData.contact || "notre page de support sur ThemeForest"}.</p>
        </section>

        <section id="changelog" class="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 class="text-3xl font-bold section-title mb-4">Changelog</h2>
            <pre class="bg-gray-800 text-white p-4 rounded-md mt-4"><code>
${templateData.changelog || "[Date] - Version initiale"}
            </code></pre>
        </section>

        <footer class="text-center text-gray-500 mt-12">
            <p>&copy; ${new Date().getFullYear()} ${templateData.author || "Votre Nom"}. Tous droits réservés.</p>
        </footer>
    </div>
</body>
</html>
        `;
        return docHtml;
    }

    async generateReadmeTxt(templateData) {
        // Implémentation de la génération de README.txt
        return `
# ${templateData.name || "Votre Template"}

${templateData.description || "Un template HTML moderne et réactif pour vos projets web."}

## Table des Matières

1. Introduction
2. Installation
3. Structure des Fichiers
4. Personnalisation
5. Dépendances
6. FAQ
7. Contact
8. Changelog

## Installation

Décompressez le fichier ZIP et uploadez le contenu du dossier 'Template/' sur votre serveur web.

## Support

Pour toute question, veuillez consulter la documentation complète dans le dossier 'Documentation/' ou nous contacter via notre page de support.

`;
    }

    async generateLicenseMd() {
        // Implémentation de la génération de LICENSE.md
        return `
MIT License

Copyright (c) ${new Date().getFullYear()} [Nom du détenteur du droit d'auteur]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`;
    }
}

module.exports = DocBuilder;


