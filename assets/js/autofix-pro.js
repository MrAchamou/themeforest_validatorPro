// ThemeForest Validator Pro - AutoFix Pro Module
// Module de correction automatique des erreurs techniques

const cheerio = require("cheerio");
const esprima = require("esprima");
const escodegen = require("escodegen");
const estraverse = require("estraverse");
const JSZip = require("jszip");

class AutoFixPro {
    constructor() {
        // Initialisation
    }

    async fixHTML(content) {
        let $ = cheerio.load(content);

        // 1. Ajouter DOCTYPE si manquant
        if (!content.includes("<!DOCTYPE html>")) {
            content = "<!DOCTYPE html>\n" + content;
            $ = cheerio.load(content); // Recharger le contenu après ajout du doctype
        }

        // 2. Ajouter balises manquantes (html, head, body)
        if ($("html").length === 0) {
            $("body").wrap("<html></html>");
        }
        if ($("head").length === 0) {
            $("html").prepend("<head></head>");
        }
        if ($("body").length === 0) {
            $("body").append("<body></body>");
        }

        // 3. Corriger les balises mal fermées (Cheerio gère une grande partie de cela automatiquement lors du chargement)
        // Pour des cas spécifiques, on peut ajouter des règles ici si nécessaire.

        // 4. Ajouter meta tags essentiels
        const head = $("head");
        if (head.find("meta[charset=\'UTF-8\']").length === 0) {
            head.prepend("<meta charset=\"UTF-8\">");
        }
        if (head.find("meta[name=\'viewport\']").length === 0) {
            head.append("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">");
        }
        // Exemple pour description, keywords, author - à adapter selon les besoins
        if (head.find("meta[name=\'description\']").length === 0) {
            head.append("<meta name=\"description\" content=\"Description du template\">");
        }
        if (head.find("meta[name=\'keywords\']").length === 0) {
            head.append("<meta name=\"keywords\" content=\"keywords, template, html\">");
        }
        if (head.find("meta[name=\'author\']").length === 0) {
            head.append("<meta name=\"author\" content=\"Nom de l\\\\\\'auteur\">");
        }

        // 5. Générer structure de base sémantique HTML5 (si elle n\\\\\\'existe pas)
        // Ceci est un exemple très basique, une implémentation plus robuste nécessiterait une analyse plus approfondie.
        if ($("header").length === 0 && $("body").find("header").length === 0) {
            $("body").prepend("<header></header>");
        }
        if ($("main").length === 0 && $("body").find("main").length === 0) {
            $("body").append("<main></main>");
        }
        if ($("footer").length === 0 && $("body").find("footer").length === 0) {
            $("body").append("<footer></footer>");
        }

        return $.html();
    }

    async fixJS(content) {
        try {
            const ast = esprima.parseScript(content, { loc: true, range: true }); // Ajouter range: true

            // Supprimer console.log() et alert()
            const newBody = [];
            for (const node of ast.body) {
                if (node.type === 'ExpressionStatement' &&
                    node.expression.type === 'CallExpression' &&
                    node.expression.callee.type === 'MemberExpression' &&
                    node.expression.callee.object.type === 'Identifier' &&
                    node.expression.callee.object.name === 'console' &&
                    node.expression.callee.property.type === 'Identifier' &&
                    node.expression.callee.property.name === 'log') {
                    // Supprimer console.log
                    continue;
                }
                if (node.type === 'ExpressionStatement' &&
                    node.expression.type === 'CallExpression' &&
                    node.expression.callee.type === 'Identifier' &&
                    node.expression.callee.name === 'alert') {
                    // Supprimer alert
                    continue;
                }
                newBody.push(node);
            }
            ast.body = newBody;

            // Ajouter try/catch sur les fonctions critiques (exemple: fonctions asynchrones)
            estraverse.replace(ast, {
                enter: function (node, parent) {
                    if ((node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression') && node.body && node.body.range) {
                        // Simple heuristique: si la fonction contient 'await' ou est marquée comme 'async', on la considère critique
                        if (node.async || content.substring(node.body.range[0], node.body.range[1]).includes('await')) {
                            const originalBody = node.body;
                            node.body = {
                                type: 'BlockStatement',
                                body: [
                                    {
                                        type: 'TryStatement',
                                        block: originalBody,
                                        handler: {
                                            type: 'CatchClause',
                                            param: {
                                                type: 'Identifier',
                                                name: 'error'
                                            },
                                            body: {
                                                type: 'BlockStatement',
                                                body: [
                                                    {
                                                        type: 'ExpressionStatement',
                                                        expression: {
                                                            type: 'CallExpression',
                                                            callee: {
                                                                type: 'MemberExpression',
                                                                object: {
                                                                    type: 'Identifier',
                                                                    name: 'console'
                                                                },
                                                                property: {
                                                                    type: 'Identifier',
                                                                    name: 'error'
                                                                }
                                                            },
                                                            arguments: [
                                                                {
                                                                    type: 'Literal',
                                                                    value: `Erreur dans la fonction ${node.id ? node.id.name : 'anonyme'}:`
                                                                },
                                                                {
                                                                    type: 'Identifier',
                                                                    name: 'error'
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            }
                                        },
                                        finalizer: null
                                    }
                                ]
                            };
                        }
                    }
                }
            });

            return escodegen.generate(ast);
        } catch (e) {
            console.error("Erreur lors de l'analyse ou de la correction JS:", e);
            return content; // Retourne le contenu original en cas d'erreur
        }
    }

    async extractInlineStylesAndScripts(htmlContent) {
        let $ = cheerio.load(htmlContent);
        let extractedCss = "";
        let extractedJs = "";
        let styleCount = 0;
        let scriptCount = 0;

        // Extraire les styles inline
        $("style").each((i, elem) => {
            const styleText = $(elem).html();
            if (styleText.trim().length > 0) {
                extractedCss += `/* Inline Style ${++styleCount} */\n` + styleText + "\n\n";
                $(elem).remove(); // Supprimer le style inline du HTML
            }
        });

        // Extraire les scripts inline
        $("script:not([src])").each((i, elem) => {
            const scriptText = $(elem).html();
            if (scriptText.trim().length > 0) {
                extractedJs += `// Inline Script ${++scriptCount} \n` + scriptText + "\n\n";
                $(elem).remove(); // Supprimer le script inline du HTML
            }
        });

        return {
            html: $.html(),
            extractedCss: extractedCss,
            extractedJs: extractedJs
        };
    }

    async injectMissingFiles(zipContent) {
        const files = Object.keys(zipContent.files);
        const newZip = new JSZip();

        // Copier les fichiers existants
        for (const fileName of files) {
            if (!zipContent.files[fileName].dir) {
                newZip.file(fileName, await zipContent.files[fileName].async("nodebuffer"));
            } else {
                newZip.folder(fileName); // Recréer les dossiers
            }
        }

        // Vérifier et injecter les dossiers manquants
        const requiredFolders = ["Template/", "Documentation/", "Licenses/"];
        for (const folder of requiredFolders) {
            if (!files.some(f => f.startsWith(folder))) {
                newZip.folder(folder);
            }
        }

        // Vérifier et générer les fichiers manquants
        const requiredFiles = {
            "README.txt": "Ceci est un fichier README généré automatiquement.\n",
            "LICENSE.md": "MIT License\n\nCopyright (c) [Année] [Nom du détenteur du droit d\'auteur]\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n",
            "changelog.txt": "Changelog\n\n[Date] - Initialisation du changelog\n"
        };

        for (const [fileName, content] of Object.entries(requiredFiles)) {
            if (!files.includes(fileName)) {
                newZip.file(fileName, content);
            }
        }

        return newZip;
    }

    async createSubmitReadyZip(zipContent) {
        try {
            const zipBlob = await zipContent.generateAsync({ type: "blob" });
            return zipBlob;
        } catch (e) {
            console.error("Erreur lors de la création du zip final:", e);
            throw new Error("Impossible de créer le zip final.");
        }
    }
}

module.exports = AutoFixPro;


