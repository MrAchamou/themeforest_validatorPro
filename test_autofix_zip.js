// Test script for AutoFixPro zip functions

const fs = require("fs");
const path = require("path");
const JSZip = require("jszip");
const AutoFixPro = require("./assets/js/autofix-pro");

async function testAutoFixZip() {
    const autofix = new AutoFixPro();
    const initialZip = new JSZip();

    // Ajouter quelques fichiers initiaux au zip
    initialZip.file("index.html", "<html><body>Hello</body></html>");
    initialZip.file("assets/css/style.css", "body { color: red; }");

    console.log("--- Testing injectMissingFiles ---");
    const zipWithInjectedFiles = await autofix.injectMissingFiles(initialZip);

    // Vérifier si les fichiers et dossiers ont été injectés
    console.log("Files in zip after injection:");
    zipWithInjectedFiles.forEach((relativePath, zipEntry) => {
        console.log(relativePath);
    });

    console.log("\n--- Testing createSubmitReadyZip ---");
    const finalZipBlob = await autofix.createSubmitReadyZip(zipWithInjectedFiles);

    // Sauvegarder le zip pour vérification manuelle
    const outputPath = path.join(__dirname, "submit-ready.zip");
    fs.writeFileSync(outputPath, Buffer.from(await finalZipBlob.arrayBuffer()));
    console.log(`Final zip saved to: ${outputPath}`);
}

testAutoFixZip().catch(console.error);


