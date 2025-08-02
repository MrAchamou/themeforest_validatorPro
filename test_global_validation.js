// Test script for global validation flow

const fs = require("fs");
const path = require("path");
const JSZip = require("jszip");
const ThemeForestValidator = require("./assets/js/validator-core");

async function testGlobalValidation() {
    const validator = new ThemeForestValidator();

    // Créer un fichier zip de test en mémoire
    const zip = new JSZip();
    zip.file("index.html", "<!DOCTYPE html><html><head><title>Test</title></head><body><h1>Hello</h1><script>console.log(\"test\");</script></body></html>");
    zip.file("assets/css/style.css", "body { color: blue; }");
    zip.file("assets/js/script.js", "function test() { alert(\"hello\"); } ");
    zip.file("Documentation/doc.html", "<p>Documentation content</p>");
    zip.file("Licenses/license.txt", "License text");
    zip.file("README.txt", "README content");
    zip.file("changelog.txt", "Changelog content");

    const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });
    // const testFile = new File([zipBuffer], "test_template.zip", { type: "application/zip" }); // Removed browser-specific File object

    console.log("--- Starting Global Validation Test ---");
    try {
        const results = await validator.analyzeTemplate(zipBuffer); // Pass the buffer directly
        console.log("Global Validation Results:", JSON.stringify(results, null, 2));

        // Vérifier quelques résultats clés
        if (results.issues.length === 0) {
            console.log("✅ No issues found (expected for a clean test file).");
        } else {
            console.log("❌ Issues found:", results.issues);
        }
        if (results.totalScore > 0) {
            console.log("✅ Total score calculated.");
        } else {
            console.log("❌ Total score not calculated.");
        }
        if (results.fileAnalysis["index.html"]) {
            console.log("✅ index.html analyzed.");
        } else {
            console.log("❌ index.html not analyzed.");
        }

        console.log("--- Global Validation Test Completed Successfully ---");
    } catch (error) {
        console.error("❌ Global Validation Test Failed:", error);
    }
}

testGlobalValidation().catch(console.error);


