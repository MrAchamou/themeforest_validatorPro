// Test script for AutoFixPro module

const fs = require('fs');
const path = require('path');
const AutoFixPro = require('./assets/js/autofix-pro');

async function testAutoFixPro() {
    const autofix = new AutoFixPro();
    
    // Test HTML content
    const htmlContent = fs.readFileSync(path.join(__dirname, 'test_html.html'), 'utf8');
    console.log("Original HTML:");
    console.log(htmlContent);
    
    // Test fixHTML
    console.log("\n--- Testing fixHTML ---");
    const fixedHTML = await autofix.fixHTML(htmlContent);
    console.log("Fixed HTML:");
    console.log(fixedHTML);
    
    // Test extractInlineStylesAndScripts
    console.log("\n--- Testing extractInlineStylesAndScripts ---");
    const extracted = await autofix.extractInlineStylesAndScripts(htmlContent);
    console.log("Extracted CSS:");
    console.log(extracted.extractedCss);
    console.log("Extracted JS:");
    console.log(extracted.extractedJs);
    console.log("Modified HTML:");
    console.log(extracted.html);
    
    // Test fixJS
    console.log("\n--- Testing fixJS ---");
    const jsContent = `
        console.log("Test log");
        alert("Test alert");
        async function testFunction() {
            await someAsyncOperation();
        }
    `;
    const fixedJS = await autofix.fixJS(jsContent);
    console.log("Fixed JS:");
    console.log(fixedJS);
}

testAutoFixPro().catch(console.error);

