// Test script for DocBuilder module

const fs = require("fs");
const path = require("path");
const DocBuilder = require("./assets/js/doc-builder");

async function testDocBuilder() {
    const docBuilder = new DocBuilder();

    const templateData = {
        name: "My Awesome Template",
        description: "A modern and responsive HTML template.",
        purpose: "showcasing web projects",
        contact: "support@example.com",
        author: "John Doe",
        changelog: "1.0.0 - Initial Release\n1.0.1 - Bug fixes"
    };

    console.log("--- Testing generateDocumentation ---");
    const docHtmlContent = await docBuilder.generateDocumentation(templateData);
    const docHtmlPath = path.join(__dirname, "documentation", "index.html");
    fs.mkdirSync(path.dirname(docHtmlPath), { recursive: true });
    fs.writeFileSync(docHtmlPath, docHtmlContent);
    console.log(`Documentation HTML saved to: ${docHtmlPath}`);

    console.log("\n--- Testing generateReadmeTxt ---");
    const readmeTxtContent = await docBuilder.generateReadmeTxt(templateData);
    const readmeTxtPath = path.join(__dirname, "README.txt");
    fs.writeFileSync(readmeTxtPath, readmeTxtContent);
    console.log(`README.txt saved to: ${readmeTxtPath}`);

    console.log("\n--- Testing generateLicenseMd ---");
    const licenseMdContent = await docBuilder.generateLicenseMd();
    const licenseMdPath = path.join(__dirname, "LICENSE.md");
    fs.writeFileSync(licenseMdPath, licenseMdContent);
    console.log(`LICENSE.md saved to: ${licenseMdPath}`);
}

testDocBuilder().catch(console.error);


